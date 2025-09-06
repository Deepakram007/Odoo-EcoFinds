import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductFeed from "./pages/ProductFeed";
import AddProduct from "./pages/AddProduct";
import MyListings from "./pages/MyListings";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import PreviousPurchases from "./pages/PreviousPurchases";
import { useAuth } from "./context/AuthContext";

function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App(){
  return (
    <div>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<ProductFeed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/add-product" element={<Protected><AddProduct /></Protected>} />
          <Route path="/my-listings" element={<Protected><MyListings /></Protected>} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Protected><Cart /></Protected>} />
          <Route path="/purchases" element={<Protected><PreviousPurchases /></Protected>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}