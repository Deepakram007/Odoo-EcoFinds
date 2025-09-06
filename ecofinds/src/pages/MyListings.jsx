import React from "react";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MyListings(){
  const { products, remove } = useProducts();
  const { user } = useAuth();
  const nav = useNavigate();
  const mine = products.filter(p=>p.sellerId === user.id);

  const doDelete = (id)=>{ if(confirm("Delete this listing?")) remove(id); };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl text-gold font-semibold">My Listings</h2>
        <button onClick={()=>nav("/add-product")} className="btn">Add</button>
      </div>
      {mine.length === 0 ? <div className="text-gray-500 text-gold">You have no listings.</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mine.map(p=> (
            <div key={p.id} className="card">
              <img src={p.image || 'https://via.placeholder.com/400x260'} className="rounded-xl mb-3 h-40 w-full object-cover" alt={p.title} />
              <h3 className="font-semibold text-gold">{p.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <div className="text-green-700 font-bold">₹{p.price}</div>
                <div className="flex gap-2">
                  <button onClick={()=>nav(`/product/${p.id}`)} className="btn-ghost text-gold">View</button>
                  <button onClick={()=>doDelete(p.id)} className="text-red-500">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}