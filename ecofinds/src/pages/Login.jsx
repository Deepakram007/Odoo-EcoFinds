import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login(){
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = (e)=>{
    e.preventDefault();
    const r = login(email.trim(), password);
    if(r.success) nav("/");
    else setErr(r.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="w-full max-w-md p-8 card">
        <h1 className="text-2xl font-bold text-gold text-center mb-4">Welcome back to EcoFinds</h1>
        <form onSubmit={submit} className="space-y-4">
          {err && <div className="text-red-500">{err}</div>}
          <input className="w-full border px-4 py-2 rounded-lg" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" className="w-full border px-4 py-2 rounded-lg" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button className="w-full btn">Login</button>
        </form>
        <p className="text-sm mt-4 text-center">Don't have an account? <Link to="/signup" className="text-green-600">Sign up</Link></p>
      </div>
    </div>
  );
}