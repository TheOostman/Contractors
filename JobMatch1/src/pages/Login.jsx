import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError(""); setMessage("");
    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('token', data.token);
      setMessage(`Welcome back ${data.user.first_name}!`);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{display:'flex', minHeight:'100vh', alignItems:'center', justifyContent:'center'}}>
      <form onSubmit={handleSubmit} style={{width:360, padding:24, border:'1px solid #ddd', borderRadius:12, background:'#fff'}}>
        <h2 style={{marginTop:0, marginBottom:16}}>Login</h2>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{width:'100%', padding:10, margin:'6px 0 12px', borderRadius:8, border:'1px solid #ccc'}}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{width:'100%', padding:10, margin:'6px 0 16px', borderRadius:8, border:'1px solid #ccc'}}
        />
        <button type="submit" disabled={loading} style={{width:'100%', padding:12, borderRadius:8, border:'none'}}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        {error && <p style={{color:'red', marginTop:12}}>{error}</p>}
        {message && <p style={{color:'green', marginTop:12}}>{message}</p>}
      </form>
    </div>
  );
}
