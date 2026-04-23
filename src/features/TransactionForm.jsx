import { useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

export default function TransactionForm({ onSaved }) {
  const [form, setForm] = useState({
    amount: "",
    type: "income",
    category: "",
    date: "",
    note: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/transaction", {
        ...form,
        amount: Number(form.amount),
      });

      setForm({
        amount: "",
        type: "income",
        category: "",
        date: "",
        note: "",
      });

      toast.success("Finance Added successfully 🎉");

      onSaved();
    } catch (err) {
      toast.error(err.response?.data?.message || "Finance Add failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 rounded-2xl shadow space-y-4"
    >
      <h2 className="text-lg font-semibold">Add Transaction</h2>

      <div className="grid md:grid-cols-1 gap-4">
        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="border p-2 rounded"
          required
        />

        {/* Type */}
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category */}
        <input
          type="text"
          placeholder="Category (e.g. Food, Sales)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 rounded"
        />

        {/* Date */}
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 rounded"
          required
        />
      </div>

      {/* Note */}
      <textarea
        placeholder="Optional note"
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
        className="border p-2 rounded w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}
