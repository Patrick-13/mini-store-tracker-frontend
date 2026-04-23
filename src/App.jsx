import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";

function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />

      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <>
                {/* NAVBAR */}
                <header className="bg-white border-b shadow-sm">
                  <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">
                      💰 Finance Tracker
                    </h1>

                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-500">
                        Welcome,{" "}
                        <span className="font-medium text-gray-700">
                          {user?.name?.split(" ")?.[0]?.charAt(0).toUpperCase() +
                            user?.name?.split(" ")?.[0]?.slice(1)}
                        </span>{" "}
                        👋
                      </p>

                      <button
                        onClick={logout}
                        className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </header>

                <main className="max-w-6xl mx-auto px-6 py-8">
                  <Dashboard />
                </main>
              </>
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;