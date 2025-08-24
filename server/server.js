// server/server.js
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

process.on('uncaughtException', (err) => console.error('Uncaught exception:', err));
process.on('unhandledRejection', (reason) => console.error('Unhandled rejection:', reason));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ---------- Resolve DB path ----------
let DB_PATH = process.env.SQLITE_PATH;
const candidates = [
  DB_PATH,
  path.resolve(__dirname, '../JobMatch1/database.db'),
  path.resolve(__dirname, './database.db'),
].filter(Boolean);

for (const p of candidates) {
  try {
    const dir = path.dirname(p);
    if (fs.existsSync(dir)) { DB_PATH = p; break; }
  } catch {}
}
console.log('Using SQLite path:', DB_PATH);
if (!fs.existsSync(path.dirname(DB_PATH))) {
  console.error('Parent folder does not exist:', path.dirname(DB_PATH));
  process.exit(1);
}

// ---------- Connect ----------
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) console.error('Failed to connect to SQLite:', err);
  else console.log('Connected to SQLite at', DB_PATH);
});

// ---------- Auto-detected column names ----------
let FIRST_COL = 'first_name';
let LAST_COL  = 'last_name';
let PASS_COL  = 'password_hash';
let DOB_COL   = 'date_of_birth';

const NOT_NULL = new Set();

function ensureUsersTable(cb) {
  db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='users'`, (err, row) => {
    if (err) { console.error('Check users table error:', err); return cb?.(err); }

    const createFresh = () => {
      db.run(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT NOT NULL,
          last_name  TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          role TEXT NOT NULL CHECK(role IN ('client','business')) DEFAULT 'client',
          phone TEXT,
          date_of_birth TEXT,
          address TEXT,
          created_at TEXT DEFAULT (datetime('now'))
        )`,
        (e) => {
          if (e) console.error('Create users table error:', e);
          else console.log('Users table ready (fresh).');
          cb?.();
        }
      );
    };

    if (!row) return createFresh();

    db.all(`PRAGMA table_info(users)`, (e, cols) => {
      if (e) { console.error('PRAGMA table_info error:', e); return cb?.(e); }

      const names = new Set(cols.map(c => c.name));
      NOT_NULL.clear();
      cols.forEach(c => { if (c.notnull) NOT_NULL.add(c.name); });

      if (names.has('firstname')) FIRST_COL = 'firstname';
      else if (!names.has('first_name')) db.run(`ALTER TABLE users ADD COLUMN first_name TEXT`, () => {});

      if (names.has('lastname')) LAST_COL = 'lastname';
      else if (!names.has('last_name')) db.run(`ALTER TABLE users ADD COLUMN last_name TEXT`, () => {});

      if (names.has('password')) PASS_COL = 'password';
      else if (!names.has('password_hash')) db.run(`ALTER TABLE users ADD COLUMN password_hash TEXT`, () => {});

      if      (names.has('DOB'))        DOB_COL = 'DOB';
      else if (names.has('dob'))        DOB_COL = 'dob';
      else if (names.has('birthdate'))  DOB_COL = 'birthdate';
      else if (names.has('dateofbirth'))DOB_COL = 'dateofbirth';
      else if (names.has('date_of_birth')) DOB_COL = 'date_of_birth';
      else {
        db.run(`ALTER TABLE users ADD COLUMN date_of_birth TEXT`, () => {});
        DOB_COL = 'date_of_birth';
      }

      const ensure = (col, ddl) => { if (!names.has(col)) db.run(`ALTER TABLE users ADD COLUMN ${ddl}`, () => {}); };
      ensure('email', 'email TEXT');
      ensure('role',  `role TEXT DEFAULT 'client'`);
      ensure('phone', 'phone TEXT');
      ensure('address', 'address TEXT');
      ensure('created_at', `created_at TEXT DEFAULT (datetime('now'))`);

      console.log('Users table ready. Using columns:', { FIRST_COL, LAST_COL, PASS_COL, DOB_COL });
      cb?.();
    });
  });
}

function signToken(user) {
  const payload = {
    id: user.id,
    first_name: user[FIRST_COL],
    last_name:  user[LAST_COL],
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
}

function looksHashed(val) {
  return typeof val === 'string' && val.startsWith('$2');
}

function normalizeDob(input) {
  if (!input) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(input);
  if (m) return `${m[3]}-${m[2]}-${m[1]}`;
  return input;
}

// ---------- Routes ----------
app.post('/api/auth/register', async (req, res) => {
  try {
    const {
      first_name, last_name, firstname, lastname,
      email, password, role='client',
      phone=null, date_of_birth=null, dob=null, birthdate=null, dateofbirth=null,
      address=null
    } = req.body;

    const first = first_name ?? firstname;
    const last  = last_name  ?? lastname;

    if (!first || !last || !email || !password) {
      return res.status(400).json({ error: 'first_name/firstname, last_name/lastname, email and password are required' });
    }

    const dobInput = date_of_birth ?? dob ?? birthdate ?? dateofbirth ?? null;
    const dobNormalized = normalizeDob(dobInput);

    if (NOT_NULL.has(DOB_COL) && !dobNormalized) {
      return res.status(400).json({ error: `${DOB_COL} is required` });
    }

    const hash = await bcrypt.hash(password, 10);

    const cols = [FIRST_COL, LAST_COL, 'email', PASS_COL, 'role', 'phone', DOB_COL, 'address'];
    const placeholders = cols.map(() => '?').join(',');
    const values = [first, last, email, hash, role, phone, dobNormalized, address];

    const stmt = db.prepare(`INSERT INTO users (${cols.join(',')}) VALUES (${placeholders})`);
    stmt.run(values, function(err) {
      if (err) {
        if (String(err.message).includes('UNIQUE')) {
          return res.status(409).json({ error: 'email already exists' });
        }
        console.error('Register error:', err);
        return res.status(500).json({ error: 'failed to register' });
      }
      const row = { id: this.lastID, role };
      row[FIRST_COL] = first;
      row[LAST_COL]  = last;
      const token = signToken(row);
      return res.json({ user: { id: row.id, first_name: first, last_name: last, role }, token });
    });
  } catch (e) {
    console.error('Register exception:', e);
    return res.status(500).json({ error: 'server error' });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

  db.get(`SELECT * FROM users WHERE email = ? LIMIT 1`, [email], async (err, row) => {
    if (err) { console.error('Login DB error:', err); return res.status(500).json({ error: 'database error' }); }
    if (!row) return res.status(401).json({ error: 'invalid credentials' });

    const stored = row[PASS_COL];
    let ok = false;
    if (looksHashed(stored)) ok = await bcrypt.compare(password, stored);
    else ok = (password === stored);

    if (!ok) return res.status(401).json({ error: 'invalid credentials' });

    const token = signToken(row);
    return res.json({
      user: { id: row.id, first_name: row[FIRST_COL], last_name: row[LAST_COL], role: row.role },
      token
    });
  });
});

app.get('/api/auth/me', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'missing token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    return res.json({ user: payload });
  } catch {
    return res.status(401).json({ error: 'invalid token' });
  }
});

ensureUsersTable(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log('Auth server running on port', PORT));
});
