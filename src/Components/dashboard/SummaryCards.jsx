export default function SummaryCards({ summary }) {
  const cards = [
    {
      title: "Income",
      value: summary.income,
      color: "bg-green-500",
    },
    {
      title: "Expenses",
      value: summary.expense,
      color: "bg-red-500",
    },
    {
      title: "Balance",
      value: summary.balance,
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`p-5 rounded-2xl text-white shadow ${card.color}`}
        >
          <h2 className="text-sm">{card.title}</h2>
          <p className="text-2xl font-bold">₱ {card.value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
