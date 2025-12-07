export default function Error({ message, retry }) {
  return (
    <div className="bg-red-100 text-red-700 p-6 rounded-lg text-center">
      <p className="font-medium mb-3">{message}</p>
      <button
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        onClick={retry}
      >
        Try Again
      </button>
    </div>
  );
}
