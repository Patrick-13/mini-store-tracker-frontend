import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register({ onRegister, goLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Account created 🎉");
      localStorage.setItem("token", res.data.token);
      onRegister(res.data.token);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      {/* CARD */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🧾</div>

          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>

          <p className="text-sm text-gray-500 mt-1">
            Sign up to start tracking your income
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-md"
          >
            Create Account
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <button
            onClick={goLogin}
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
