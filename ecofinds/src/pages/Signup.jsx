import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup(){
  const { signup } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = (e)=>{
    e.preventDefault();
    if(password !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }
    const r = signup({ email: email.trim(), username: username.trim(), password });
    if(r.success) nav("/");
    else setErr(r.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black from-green-50 to-white">
      <div className="w-full max-w-md p-8 card">
        <h1 className="text-2xl font-bold text-green-700 text-center mb-4 text-gold">Create account</h1>
        <form onSubmit={submit} className="space-y-4">
          {err && <div className="text-red-500">{err}</div>}
          <input className="w-full border px-4 py-2 rounded-lg text-gold placeholder-gold bg-black" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
          <input className="w-full border px-4 py-2 rounded-lg text-gold placeholder-gold bg-black" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" className="w-full border px-4 py-2 rounded-lg text-gold placeholder-gold bg-black" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <input type="password" className="w-full border px-4 py-2 rounded-lg text-gold placeholder-gold bg-black" placeholder="Confirm Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required />
          <button className="w-full btn">Sign up</button>
        </form>
        <p className="text-sm mt-4 text-center">Already have an account? <Link to="/login" className="text-green-600">Login</Link></p>
      </div>
    </div>
  );
}