import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }){
  return (
    <div className="card flex flex-col bg-black-50 p-4">
      <img src={product.image || 'https://via.placeholder.com/400x260'} alt={product.title} className="rounded-xl mb-4 object-cover h-48 w-full" />
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-sm text-gold mt-1 flex-grow">{product.category}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-gold font-bold">₹{product.price}</div>
        <Link to={`/product/${product.id}`} className="btn text-sm">View</Link>
      </div>
    </div>
  );
}