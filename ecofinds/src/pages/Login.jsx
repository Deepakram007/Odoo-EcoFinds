import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login({ email, password });
    if (res.success) {
      navigate("/dashboard");
    } else {
      setMsg(res.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black border border-gold rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gold mb-4">Login</h2>
      {msg && <div className="text-red-500 text-sm mb-2">{msg}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-black border border-gold text-gold px-4 py-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-black border border-gold text-gold px-4 py-2 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-gold text-black font-semibold py-2 rounded-lg hover:bg-yellow-600"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-gray-400 mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-gold hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
