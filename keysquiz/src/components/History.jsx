// src/components/History.jsx

export default function History({ history, onClear }) {
  if (!history || history.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white p-4 rounded shadow text-sm text-slate-500">
          No quiz history yet.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-2">
      <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Quiz History</h3>
          <button
            onClick={onClear}
            className="text-sm text-red-600 hover:underline"
          >
            Clear history
          </button>
        </div>

        <div className="space-y-2">
          {/* {history.map((h, idx) => (
            <div key={idx} className="p-3 border rounded"> */}
          {history.map((h) => (
            <div key={h.date} className="p-3 border rounded">
              <div className="text-sm text-slate-600">
                {new Date(h.date).toLocaleString()}
              </div>
              <div>
                <strong>{h.score}</strong> / {h.total} —{" "}
                {h.categoryName || "Category"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
