import { useEffect, useState } from "react";
import API from "../api";
import SummaryCards from "../Components/dashboard/SummaryCards";
import TransactionList from "../features/TransactionList";
import TransactionForm from "../features/TransactionForm";
import TrendChart from "../Components/dashboard/TrendChart";

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
