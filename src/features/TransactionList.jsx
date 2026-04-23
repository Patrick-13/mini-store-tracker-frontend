import API from "../api";
import toast from "react-hot-toast";

export default function TransactionList({ transactions, onDelete }) {
  const handleDelete = async (id) => {
    try {
      await API.delete(`/transaction/${id}`);
      toast.error("Finance Deleted successfully");
      onDelete();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cannot Deleted Something Went Wrong!");
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>

      <div className="space-y-3">
        {transactions.map((t) => (
          <div
            key={t._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">{t.category || "General"}</p>
              <p className="text-sm text-gray-500">
                {new Date(t.date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`font-bold ${
                  t.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {t.type === "income" ? "+" : "-"}₱{t.amount}
              </span>

              <button
                onClick={() => handleDelete(t._id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
