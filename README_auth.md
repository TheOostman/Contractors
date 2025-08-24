# Auth Setup (JobMatch1)

This adds a simple Express/SQLite auth backend and a React Login page.

## Prereqs
- Node.js 18+

## 1) Install & run the backend
```bash
cd server
cp .env.example .env   # (optional) edit JWT_SECRET or SQLITE_PATH
npm install
npm run dev
```
Backend starts on http://localhost:3001 and reads SQLite at `/mnt/data/JobMatch1/JobMatch1/database.db`.

## 2) Run the frontend
Open a new terminal:
```bash
cd ../JobMatch1
npm install
npm run dev
```
Visit http://localhost:5173

## 3) Register a user (optional)
Use an API client or add a temporary register form, e.g.:
```bash
curl -X POST http://localhost:3001/api/auth/register \  -H "Content-Type: application/json" \  -d '{"username":"colby","email":"colby@example.com","password":"Password123!","role":"client"}'
```

## 4) Login
Go to **/login** from the floating Login button. Successful login stores a JWT in `localStorage`.