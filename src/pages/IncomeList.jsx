import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

export default function IncomeList({ refresh }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // edit state
  const [editId, setEditId] = useState(null);
  const [editAmount, setEditAmount] = useState("");

  const fetchData = async () => {
    const res = await API.get("/income");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const safeData = Array.isArray(data) ? data : [];

  // SEARCH FILTER
  const filteredData = safeData.filter((item) => item.date.includes(search));

  const today = new Date().toISOString().split("T")[0];

  const todayTotal = safeData
    .filter((d) => d.date === today)
    .reduce((sum, d) => sum + d.amount, 0);

  const now = new Date();

  const monthlyTotal = safeData
    .filter((d) => {
      const dDate = new Date(d.date);
      return (
        dDate.getMonth() === now.getMonth() &&
        dDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, d) => sum + d.amount, 0);

  // DELETE
  const handleDelete = async (id) => {
    await API.delete(`/income/${id}`);
    fetchData();
  };

  // OPEN EDIT
  const handleEdit = (item) => {
    setEditId(item._id);
    setEditAmount(item.amount);
  };

  // UPDATE
  const handleUpdate = async () => {
    await API.post("/income", {
      date: safeData.find((d) => d._id === editId)?.date,
      amount: Number(editAmount),
    });

    setEditId(null);
    setEditAmount("");
    fetchData();
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow rounded-2xl p-4">
          <p className="text-gray-500 text-sm">Today</p>
          <h2 className="text-xl font-bold">₱{todayTotal}</h2>
        </div>

        <div className="bg-white shadow rounded-2xl p-4">
          <p className="text-gray-500 text-sm">This Month</p>
          <h2 className="text-xl font-bold">₱{monthlyTotal}</h2>
        </div>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by date (YYYY-MM-DD)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
      />

      {/* LIST */}
      <div className="space-y-3">
        {filteredData.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-2xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{item.date}</p>
              <p className="text-gray-600">₱{item.amount}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 text-sm bg-yellow-400 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-80">
            <h2 className="text-lg font-bold mb-3">Update Income</h2>

            <input
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditId(null)}
                className="px-3 py-1 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
