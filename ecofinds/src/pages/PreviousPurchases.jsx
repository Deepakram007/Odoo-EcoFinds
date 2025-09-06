import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";

export default function PreviousPurchases(){
  const { user } = useAuth();
  const { products } = useProducts();
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const raw = JSON.parse(localStorage.getItem("ef_purchases") || "{}");
    const ids = (raw[user.id] || []);
    setItems(ids.map(id=>products.find(p=>p.id===id)).filter(Boolean));
  }, [user, products]);

  return (
    <div>
      <h2 className="text-xl text-gold font-semibold mb-4">Previous Purchases</h2>
      {items.length === 0 ? <div className="text-gold">No purchases yet.</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map(i=>(
            <div key={i.id} className="card">
              <img src={i.image || 'https://via.placeholder.com/400x260'} className="rounded-xl mb-3 h-40 w-full object-cover text-gold" alt={i.title} />
              <h3 className="font-semibold text-gold">{i.title}</h3>
              <div className="text-green-700 font-bold mt-2">₹{i.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}