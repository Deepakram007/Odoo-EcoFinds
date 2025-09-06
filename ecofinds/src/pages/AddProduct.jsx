import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";

const categories = ["Clothing","Electronics","Books","Accessories","Home","Other"];

export default function AddProduct(){
  const { create } = useProducts();
  const { user } = useAuth();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const submit = (e)=>{
    e.preventDefault();
    create({ title, description: desc, price: Number(price), category, image: "", sellerId: user.id });
    nav("/");
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-xl text-gold font-semibold mb-4">Add New Product</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full text-gold bg-black border px-4 py-2 rounded-lg" placeholder="Product title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <select className="w-full border bg-black text-gold px-4 py-2 rounded-lg" value={category} onChange={e=>setCategory(e.target.value)}>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <textarea className="w-full border text-gold px-4 py-2 rounded-lg" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
        <input type="number" className="w-full text-gold border px-4 py-2 rounded-lg" placeholder="Price (₹)" value={price} onChange={e=>setPrice(e.target.value)} required />
        <div className="flex items-center gap-3">
          <div className="placeholder w-40">Image</div>
          <div className="text-sm text-gray-500">Image placeholder (add upload later)</div>
        </div>
        <div className="flex justify-end">
          <button className="btn" type="submit">Submit Listing</button>
        </div>
      </form>
    </div>
  );
}