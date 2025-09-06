import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar(){
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const doLogout = ()=>{ logout(); nav("/login"); };
  return (
    <nav className="bg-black shadow-sm">
      <div className="container flex items-center justify-between py-3 bg-black">
        <div className="flex items-center gap-4 ">
          <Link to="/" className="text-gold-700 font-bold text-xl">EcoFinds</Link>
          <Link to="/" className="text-sm text-gold-600 hover:text-green-600">Marketplace</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-gold-600 hover:text-green-600">Browse</Link>
          {user && <Link to="/add-product" className="text-sm text-gold-600 hover:text-green-600">Add</Link>}
          {user && <Link to="/my-listings" className="text-sm text-gold-600 hover:text-green-600">My Listings</Link>}
          {user && <Link to="/cart" className="text-sm text-gold-600 hover:text-green-600">Cart</Link>}
          {user && <Link to="/purchases" className="text-sm text-gold-600 hover:text-green-600">Purchases</Link>}
          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard" className="text-sm text-gold-700">{user.username || user.email}</Link>
              <button onClick={doLogout} className="text-sm text-red-500">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm text-gold-700 font-medium ">Login</Link>
              <Link to="/signup" className="text-sm text-gold-700 font-medium hover:">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}