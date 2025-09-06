import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }){
  const { user } = useAuth();
  const [items, setItems] = useState(()=>{
    const raw = localStorage.getItem("ef_cart");
    return raw?JSON.parse(raw):{};
  });

  const persist = (next)=>{ localStorage.setItem("ef_cart", JSON.stringify(next)); setItems(next); };

  const add = (userId, productId) => {
    const copy = {...items};
    copy[userId] = Array.from(new Set([...(copy[userId]||[]), productId]));
    persist(copy);
  };

  const get = (userId) => items[userId] || [];

  const remove = (userId, productId) => {
    const copy = {...items};
    copy[userId] = (copy[userId]||[]).filter(x=>x!==productId);
    persist(copy);
  };

  const clear = (userId) => {
    const copy = {...items};
    copy[userId] = [];
    persist(copy);
  };

  return <CartContext.Provider value={{ add, get, remove, clear }}>{children}</CartContext.Provider>;
}