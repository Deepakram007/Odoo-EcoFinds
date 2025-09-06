import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function ProductDetail(){
  const { id } = useParams();
  const { getById } = useProducts();
  const product = getById(id);
  const nav = useNavigate();
  const { user } = useAuth();
  const { add } = useCart();

  if(!product) return <div className="card">Product not found</div>;

  const addToCart = ()=>{
    if(!user){ nav("/login"); return; }
    add(user.id, product.id);
    alert("Added to cart");
  };

  return (
    <div className="card">
      <button onClick={()=>nav(-1)} className="text-sm text-gray-600 mb-4">← Back</button>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img src={product.image || 'https://via.placeholder.com/800x520'} className="rounded-xl w-full object-cover" alt={product.title} />
        </div>
        <div>
          <h2 className="text-2xl text-gold font-bold">{product.title}</h2>
          <p className="text-green-700 font-bold mt-2">₹{product.price}</p>
          <p className="text-sm text-gray-600 mt-1">{product.category}</p>
          <p className="mt-4">{product.description}</p>
          <div className="mt-6 flex gap-3">
            <button onClick={addToCart} className="btn">Add to cart</button>
            <button onClick={()=>alert('Message seller flow (mock)')} className="btn-ghost">Message seller</button>
          </div>
        </div>
      </div>
    </div>
  );
}