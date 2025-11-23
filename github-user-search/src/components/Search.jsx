// import { useState } from "react";
// import { fetchUserData } from "../services/githubService";

// function Search() {
//   const [username, setUsername] = useState("");
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!username.trim()) return;

//     setLoading(true);
//     setError("");
//     setUserData(null);

//     try {
//       const data = await fetchUserData(username);
//       setUserData(data);
//     } catch (err) {
//       setError("Looks like we can't find the user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4">
//       {/* Search Form */}
//       <form onSubmit={handleSubmit} className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Search GitHub username..."
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="flex-1 border px-3 py-2 rounded-md"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded-md"
//         >
//           Search
//         </button>
//       </form>

//       {/* Loading */}
//       {loading && <p className="text-center mt-4">Loading...</p>}

//       {/* Error */}
//       {error && <p className="text-center mt-4 text-red-600">{error}</p>}

//       {/* User Info */}
//       {userData && (
//         <div className="mt-6 p-4 border rounded-md flex items-center gap-4">
//           <img
//             src={userData.avatar_url}
//             alt={userData.login}
//             className="w-20 h-20 rounded-full"
//           />

//           <div>
//             <h2 className="text-xl font-semibold">
//               {userData.name || userData.login}
//             </h2>
//             <a
//               href={userData.html_url}
//               target="_blank"
//               className="text-blue-500 underline"
//             >
//               Visit GitHub Profile
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Search;





import "../App.css";
import "../index.css";
import { useState } from "react";
import { combinedSearch } from "../services/githubService";

function Search() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await combinedSearch(query);
      setResult(response);
    } catch (_) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub user"
          className="border p-2 w-full rounded"
        />
      </form>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {result?.type === "single" && (
        <div className="mt-4 border p-4 rounded">
          <img
            src={result.data.avatar_url}
            className="w-16 h-16 rounded-full"
          />
          <h2 className="text-xl font-bold">{result.data.login}</h2>
          <a
            href={result.data.html_url}
            className="text-blue-500"
            target="_blank"
          >
            View Profile
          </a>
        </div>
      )}

      {result?.type === "multiple" && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Search Results:</h3>

          {result.data.map((user) => (
            <div key={user.id} className="flex items-center gap-3 mb-3">
              <img src={user.avatar_url} className="w-12 h-12 rounded-full" />
              <a href={user.html_url} target="_blank" className="text-blue-500">
                {user.login}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
