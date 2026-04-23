// import { useEffect, useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [income, setIncome] = useState([]);
//   const [date, setDate] = useState("");
//   const [amount, setAmount] = useState("");

//   const navigate = useNavigate();

//   // FETCH INCOME
//   const fetchIncome = async () => {
//     const res = await API.get("/income");
//     setIncome(res.data);
//   };

//   useEffect(() => {
//     fetchIncome();
//   }, []);

//   // SAVE INCOME
//   const saveIncome = async (e) => {
//     e.preventDefault();

//     await API.post("/income", {
//       date,
//       amount: Number(amount),
//     });

//     setDate("");
//     setAmount("");
//     fetchIncome();
//   };

//   // LOGOUT
//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   // =========================
//   // 📊 DATA CALCULATIONS
//   // =========================

//   const parsedIncome = income.map((i) => ({
//     ...i,
//     amount: Number(i.amount),
//   }));

//   const totalIncome = parsedIncome.reduce((sum, i) => sum + i.amount, 0);

//   const averageIncome =
//     parsedIncome.length > 0 ? totalIncome / parsedIncome.length : 0;

//   const sorted = [...parsedIncome].sort(
//     (a, b) => new Date(a.date) - new Date(b.date),
//   );

//   const last = sorted[sorted.length - 1];
//   const prev = sorted[sorted.length - 2];

//   let trend = "none";

//   if (last && prev) {
//     if (last.amount > prev.amount) trend = "up";
//     else if (last.amount < prev.amount) trend = "down";
//     else trend = "same";
//   }

//   return (
//     <>
//       {/* HEADER */}

//       {/* CONTENT */}
//       <div className="max-w-6xl mx-auto p-6">
//         <h2 className="text-xl font-bold text-gray-800">💰 Income Dashboard</h2>
//         {/* KPI CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="bg-white p-5 rounded-2xl shadow">
//             <p className="text-gray-500 text-sm">Total Income</p>
//             <h2 className="text-2xl font-bold">₱{totalIncome}</h2>
//           </div>

//           <div className="bg-white p-5 rounded-2xl shadow">
//             <p className="text-gray-500 text-sm">Average Income</p>
//             <h2 className="text-2xl font-bold">₱{averageIncome.toFixed(2)}</h2>
//           </div>

//           <div className="bg-white p-5 rounded-2xl shadow">
//             <p className="text-gray-500 text-sm">Trend</p>

//             {trend === "up" && (
//               <h2 className="text-green-600 font-bold text-lg">
//                 📈 Increasing
//               </h2>
//             )}

//             {trend === "down" && (
//               <h2 className="text-red-600 font-bold text-lg">📉 Decreasing</h2>
//             )}

//             {trend === "same" && (
//               <h2 className="text-gray-600 font-bold text-lg">➖ Stable</h2>
//             )}

//             {trend === "none" && (
//               <h2 className="text-gray-400 font-bold text-lg">No data</h2>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import API from "../api";
import SummaryCards from "../components/dashboard/SummaryCards";
import TransactionList from "../features/TransactionList";
import TransactionForm from "../features/TransactionForm";
import TrendChart from "../components/dashboard/TrendChart";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      const [sumRes, transRes] = await Promise.all([
        API.get("/transaction/summary"),
        API.get("/transaction"),
      ]);

      setSummary(sumRes.data);
      setTransactions(transRes.data);

      // build trend data
      setTrendData(buildTrendData(transRes.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const buildTrendData = (transactions) => {
    const map = {};

    transactions.forEach((t) => {
      const date = new Date(t.date).toLocaleDateString();

      if (!map[date]) {
        map[date] = { date, income: 0, expense: 0 };
      }

      if (t.type === "income") {
        map[date].income += t.amount;
      } else {
        map[date].expense += t.amount;
      }
    });

    return Object.values(map);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Summary */}
      <SummaryCards summary={summary} />

      {/* Chart + Form */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2">
          <TrendChart data={trendData} />
        </div>

        {/* Form */}
        <div>
          <TransactionForm onSaved={() => setRefresh(!refresh)} />
        </div>
      </div>

      {/* Transactions */}
      <TransactionList
        transactions={transactions}
        onDelete={() => setRefresh(!refresh)}
      />
    </div>
  );
}
