import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";

export default function Cart(){
  const { get, remove, clear } = useCart();
  const { user } = useAuth();
  const { products } = useProducts();
  const [items, setItems] = useState([]);

  useEffect(()=>{
    if(!user) return;
    const ids = get(user.id);
    setItems(ids.map(id=>products.find(p=>p.id===id)).filter(Boolean));
  }, [user, products]);

  const doRemove = (id)=>{ remove(user.id, id); setItems(items.filter(i=>i.id!==id)); };
  const checkout = ()=>{
    if(!confirm("Confirm purchase?")) return;
    const raw = JSON.parse(localStorage.getItem("ef_purchases") || "{}");
    raw[user.id] = (raw[user.id] || []).concat(items.map(i=>i.id));
    localStorage.setItem("ef_purchases", JSON.stringify(raw));
    clear(user.id);
    setItems([]);
    alert("Purchase successful!");
  };

  const total = items.reduce((s,i)=>s+(i.price||0),0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Cart</h2>
      {items.length === 0 ? <div className="text-gray-500">Cart is empty.</div> : (
        <div className="space-y-4">
          {items.map(i=>(
            <div key={i.id} className="card flex items-center gap-4">
              <img src={i.image || 'https://via.placeholder.com/200x120'} className="w-32 h-20 object-cover rounded-md" alt={i.title} />
              <div className="flex-1">
                <div className="font-semibold">{i.title}</div>
                <div className="text-sm text-gray-600">₹{i.price}</div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <button onClick={()=>doRemove(i.id)} className="text-red-500">Remove</button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between mt-4">
            <div className="text-lg font-bold">Total: ₹{total}</div>
            <div className="flex gap-2">
              <button onClick={checkout} className="btn">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}