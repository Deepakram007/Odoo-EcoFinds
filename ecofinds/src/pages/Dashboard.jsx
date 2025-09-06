import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard(){
  const { user, updateProfile } = useAuth();
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [msg, setMsg] = useState("");

  const save = (e)=>{
    e.preventDefault();
    const r = updateProfile({ username, email });
    if(r.success) setMsg("Profile updated");
    else setMsg(r.message || "Failed to update");
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-xl text-gold font-semibold mb-4">My Dashboard</h2>
      {msg && <div className="text-sm text-green-600 mb-2">{msg}</div>}
      <form onSubmit={save} className="space-y-4">
        <input className="w-full text-gold bg-black border px-4 py-2 rounded-lg" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="w-full text-gold bg-black border px-4 py-2 rounded-lg" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <div className="flex justify-end">
          <button className="btn" type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}