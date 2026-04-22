import { useState } from "react";
import IncomeForm from "./pages/IncomeForm";
import IncomeList from "./pages/IncomeList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("login");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  <Toaster position="top-right" />;

  // 🔐 If no token → show login page
  if (!token) {
    if (page === "login") {
      return (
        <Login
          onLogin={(t) => {
            localStorage.setItem("token", t);
            setToken(t);
          }}
          goRegister={() => setPage("register")}
        />
      );
    }

    return (
      <Register
        onRegister={(t) => {
          localStorage.setItem("token", t);
          setToken(t);
        }}
        goLogin={() => setPage("login")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* TOP NAVBAR */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            💰 Mini Store Income Tracker
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">
              Welcome back 👋
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* DASHBOARD GRID */}
        <Dashboard />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT - FORM CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow p-5 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                ➕ Add Income
              </h2>

              <IncomeForm onSaved={() => setRefresh(!refresh)} />
            </div>
          </div>

          {/* RIGHT - LIST CARD */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow p-5">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                📊 Income Records
              </h2>

              <IncomeList refresh={refresh} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
