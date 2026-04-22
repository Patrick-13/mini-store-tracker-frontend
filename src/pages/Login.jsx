import { useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function Login({ onLogin, goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      toast.success("Login successful 🎉");
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.token);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      {/* CARD */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">💰</div>

          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>

          <p className="text-sm text-gray-500 mt-1">Login to your account</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="Enter your password"
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
            Login
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center text-gray-500 mt-6">
          No account?{" "}
          <button
            onClick={goRegister}
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
