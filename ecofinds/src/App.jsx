import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-black text-gold flex flex-col">
        {/* Navbar */}
        <header className="bg-black border-b border-gold p-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">EcoFinds</Link>
          <nav className="space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
                <button onClick={logout} className="hover:text-white">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-white">Login</Link>
                <Link to="/signup" className="hover:text-white">Signup</Link>
              </>
            )}
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
