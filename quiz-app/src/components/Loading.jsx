
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      <p className="mt-4 text-blue-600 font-medium">Loading quiz...</p>
    </div>
  );
}
