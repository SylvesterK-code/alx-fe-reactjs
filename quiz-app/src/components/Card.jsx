export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white shadow-md rounded-2xl p-4 md:p-6 border border-gray-100 ${className}`}
    >
      {children}
    </div>
  );
}
