import axios from "axios";
import { useState, useEffect } from "react";
import API from "../api";

export default function IncomeForm({ onSaved }) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/income`, {
        date,
        amount: Number(amount),
      });

      setAmount("");
      onSaved();
    } catch (error) {
      console.error(error);
      alert("Failed to save!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      
      {/* CARD */}
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-3xl border border-gray-100 p-6">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <div className="w-12 h-12 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-3">
            💰
          </div>

          <h2 className="text-xl font-bold text-gray-800">
            Income Tracker
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Add daily store earnings
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* DATE */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200
                         focus:ring-2 focus:ring-blue-500 focus:outline-none
                         transition bg-white"
              required
            />
          </div>

          {/* AMOUNT */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Amount (₱)
            </label>
            <input
              type="number"
              placeholder="Enter income amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200
                         focus:ring-2 focus:ring-blue-500 focus:outline-none
                         transition bg-white"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700
                       text-white font-semibold py-3 rounded-xl
                       shadow-md hover:shadow-lg transition
                       active:scale-[0.98]"
          >
            + Save Income
          </button>
        </form>
      </div>
    </div>
  );
}