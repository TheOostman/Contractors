import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "client",
    phone: "",
    date_of_birth: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function update(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError(""); setMessage("");
    try {
      const resp = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Registration failed');
      localStorage.setItem('token', data.token);
      setMessage(`Welcome ${data.user.first_name}! Your account has been created.`);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{display:'flex', minHeight:'100vh', alignItems:'center', justifyContent:'center', padding:16}}>
      <form onSubmit={handleSubmit} style={{maxWidth:520, width:'100%', padding:24, border:'1px solid #ddd', borderRadius:12, background:'#fff'}}>
        <h2 style={{marginTop:0, marginBottom:16}}>Create your account</h2>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <div>
            <label>First Name *</label>
            <input type="text" required value={form.first_name} onChange={(e)=>update('first_name', e.target.value)}
              placeholder="Jane" style={{width:'100%', padding:10, marginTop:6, borderRadius:8, border:'1px solid #ccc'}}/>
          </div>
          <div>
            <label>Last Name *</label>
            <input type="text" required value={form.last_name} onChange={(e)=>update('last_name', e.target.value)}
              placeholder="Doe" style={{width:'100%', padding:10, marginTop:6, borderRadius:8, border:'1px solid #ccc'}}/>
          </div>
          <div>
            <label>Email *</label>
            <input type="email" required value={form.email} onChange={(e)=>update('email', e.target.value)}
              placeholder="you@example.com" style={{width:'100%', padding:10, marginTop:6, borderRadius:8, border:'1px solid #ccc'}}/>
          </div>
          <div>
            <label>Password *</label>
            <input type="password" required value={form.password} onChange={(e)=>update('password', e.target.value)}
              placeholder="••••••••" style={{width:'100%', padding:10, marginTop:6, borderRadius:8, border:'1px solid #ccc'}}/>
          </div>
          <div>
            <label>Role *</label>
            <select value={form.role} onChange={(e)=>update('role', e.target.value)}
              style={{width:'100%', padding:10, marginTop:6, borderRadius:8, border:'1px solid #ccc'}}>
              <option value="client">Client</option>
              <option value="business">Business</option>
            </select>
          </div>
          <div>
            <label>Phone</label>
            <input type="tel" value={form.phone} onChange={(e)=>update('phone', e.target.value)}
              placeholder="+61 4xx xxx xxx" style={{width:'100%', padding:10, marginTop:6, borderRadius:8, border:'1px solid #ccc'}}/>
          </div>
          <div>
            <label>Date of Birth</label>
            <input type="date" value={form.date_of_birth} onChange={(e)=>update('date_of_birth', e.target.value)}
              style={{width:'100%', padding:10, marginTop:6, borderRadius:8, border:'1px solid #ccc'}}/>
          </div>
          <div style={{gridColumn:'1 / span 2'}}>
            <label>Address</label>
            <input type="text" value={form.address} onChange={(e)=>update('address', e.target.value)}
              placeholder="Street, City, State" style={{width:'100%', padding:10, marginTop:6, borderRadius:8, border:'1px solid #ccc'}}/>
          </div>
        </div>

        <button type="submit" disabled={loading} style={{width:'100%', padding:12, borderRadius:8, border:'none', marginTop:16}}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
        {error && <p style={{color:'red', marginTop:12}}>{error}</p>}
        {message && <p style={{color:'green', marginTop:12}}>{message}</p>}
        <p style={{marginTop:12, fontSize:12, color:'#666'}}>Fields marked * are required.</p>
      </form>
    </div>
  );
}
