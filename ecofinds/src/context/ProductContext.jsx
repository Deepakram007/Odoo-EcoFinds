import React, { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();
export const useProducts = () => useContext(ProductContext);

function uid(){ return 'p_' + Date.now().toString(36) + Math.random().toString(36).slice(2,8); }

const seed = () => ( [
  { id: uid(), title: "Vintage Backpack", description: "Gently used backpack", category: "Accessories", price: 1200, image: "", sellerId: "system" },
  { id: uid(), title: "Paperback: The Alchemist", description: "Fair condition", category: "Books", price: 250, image: "", sellerId: "system" },
  { id: uid(), title: "Over-ear Headphones", description: "Good sound", category: "Electronics", price: 800, image: "", sellerId: "system" },
]);

export function ProductProvider({ children }){
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const raw = localStorage.getItem("ef_products");
    if(raw) setProducts(JSON.parse(raw));
    else {
      const s = seed();
      localStorage.setItem("ef_products", JSON.stringify(s));
      setProducts(s);
    }
  }, []);

  const persist = (next)=>{ localStorage.setItem("ef_products", JSON.stringify(next)); setProducts(next); };

  const create = (p) => {
    const item = { ...p, id: uid() };
    const next = [item, ...products];
    persist(next);
    return item;
  };

  const update = (id, patch) => {
    const next = products.map(p=>p.id===id?{...p,...patch}:p);
    persist(next);
    return next.find(x=>x.id===id);
  };

  const remove = (id) => {
    const next = products.filter(p=>p.id!==id);
    persist(next);
  };

  const getById = (id) => products.find(p=>p.id===id) || null;

  return <ProductContext.Provider value={{ products, create, update, remove, getById }}>{children}</ProductContext.Provider>;
}