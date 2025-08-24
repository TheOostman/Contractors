import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function Shell() {
  return (
    <BrowserRouter>
      {/* floating mini-nav in top-right */}
      <div style={{position:'fixed', top:16, right:16, zIndex:9999, display:'flex', gap:8}}>
        <Link to="/register" style={{padding:'8px 14px', border:'1px solid #444', borderRadius:8, background:'#fff', textDecoration:'none'}}>
          Register
        </Link>
        <Link to="/login" style={{padding:'8px 14px', border:'1px solid #444', borderRadius:8, background:'#fff', textDecoration:'none'}}>
          Login
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Shell />
  </React.StrictMode>,
)
