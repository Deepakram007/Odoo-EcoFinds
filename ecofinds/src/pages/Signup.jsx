import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (res.success) {
        navigate("/dashboard");
      } else {
        setMsg(res.message || "Signup failed");
      }
    } catch (error) {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full bg-black border border-[#d4af37] rounded-2xl p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-[#d4af37] mb-4">Create Account</h2>

        {msg && <div className="text-red-500 text-sm mb-2">{msg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {["username", "email", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-[#d4af37] mb-1"
              >
                {field === "confirmPassword"
                  ? "Confirm Password"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={
                  field.includes("password") ? "password" : field === "email" ? "email" : "text"
                }
                id={field}
                name={field}
                placeholder={
                  field === "confirmPassword"
                    ? "Re-enter your password"
                    : `Enter your ${field}`
                }
                className="w-full bg-black border border-[#d4af37] text-[#d4af37] placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-[#d4af37] hover:bg-[#c19a2d]"
            } text-black font-semibold py-2 rounded-lg transition`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#d4af37] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}