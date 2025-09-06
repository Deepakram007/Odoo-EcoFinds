import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";

const categories = ["All","Clothing","Electronics","Books","Accessories","Home","Other"];

export default function ProductFeed(){
  const { products } = useProducts();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = products.filter(p=>{
    const matchQ = p.title.toLowerCase().includes(query.toLowerCase());
    const matchC = cat === "All" || p.category === cat;
    return matchQ && matchC;
  });

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-green-700">EcoFinds Marketplace</h1>
          <p className="text-sm text-gray-600">Sustainable second-hand shopping</p>
        </div>
        <div className="flex gap-2 items-center">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by title..." className="border rounded-lg px-3 py-2" />
          <select value={cat} onChange={e=>setCat(e.target.value)} className="border rounded-lg px-3 py-2">
            {categories.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.length === 0 ? <div className="text-gray-500">No products found.</div> : filtered.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}