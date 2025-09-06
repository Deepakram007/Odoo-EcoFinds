import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function uid(){ return 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2,8); }

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const s = localStorage.getItem("ef_session");
    if(s) setUser(JSON.parse(s));
  },[]);

  const signup = ({ email, username, password }) => {
    const users = JSON.parse(localStorage.getItem("ef_users") || "{}");
    if(users[email]) return { success:false, message:"Email already registered" };
    const id = uid();
    users[email] = { id, email, username, password };
    localStorage.setItem("ef_users", JSON.stringify(users));
    const session = { id, email, username };
    localStorage.setItem("ef_session", JSON.stringify(session));
    setUser(session);
    return { success:true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("ef_users") || "{}");
    const u = users[email];
    if(!u) return { success:false, message:"No account with that email" };
    if(u.password !== password) return { success:false, message:"Incorrect password" };
    const session = { id: u.id, email: u.email, username: u.username };
    localStorage.setItem("ef_session", JSON.stringify(session));
    setUser(session);
    return { success:true };
  };

  const logout = () => {
    localStorage.removeItem("ef_session");
    setUser(null);
  };

  const updateProfile = ({ username, email }) => {
    const users = JSON.parse(localStorage.getItem("ef_users") || "{}");
    // find user by id
    const recEmail = Object.keys(users).find(k=>users[k].id === user.id);
    if(!recEmail) return { success:false };
    const rec = users[recEmail];
    // if email changed and exists, reject
    if(email !== recEmail && users[email]) return { success:false, message:"Email taken" };
    delete users[recEmail];
    rec.email = email;
    rec.username = username;
    users[email] = rec;
    localStorage.setItem("ef_users", JSON.stringify(users));
    const session = { id: rec.id, email: rec.email, username: rec.username };
    localStorage.setItem("ef_session", JSON.stringify(session));
    setUser(session);
    return { success:true };
  };

  return <AuthContext.Provider value={{ user, signup, login, logout, updateProfile }}>{children}</AuthContext.Provider>;
}