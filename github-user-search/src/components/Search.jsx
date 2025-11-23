import "../App.css";
import "../index.css";
import { useState } from "react";
import { combinedSearch, searchUsers } from "../services/githubService";

function Search() {
  // ------------------------------
  // Toggle between Basic and Advanced Search
  // ------------------------------
  const [isAdvanced, setIsAdvanced] = useState(false);

  // ------------------------------
  // Basic Search State
  // ------------------------------
  const [basicQuery, setBasicQuery] = useState("");
  const [basicResult, setBasicResult] = useState(null);

  // ------------------------------
  // Advanced Search State
  // ------------------------------
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [advResults, setAdvResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  // ------------------------------
  // Shared State
  // ------------------------------
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const perPage = 10;

  // ------------------------------
  // Basic Search Handler
  // ------------------------------
  const handleBasicSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBasicResult(null);

    try {
      const response = await combinedSearch(basicQuery);
      setBasicResult(response);
    } catch (_) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // Advanced Search Handler with Pagination
  // ------------------------------
  const handleAdvancedSearch = async (e, newPage = 1) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { users, total_count } = await searchUsers({
        username,
        location,
        minRepos,
        page: newPage,
        per_page: perPage,
      });

      if (newPage === 1) {
        setAdvResults(users);
      } else {
        setAdvResults((prev) => [...prev, ...users]);
      }

      setTotalCount(total_count);
      setPage(newPage);
    } catch (_) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // Load More Button for Advanced Search
  // ------------------------------
  const handleLoadMore = () => {
    handleAdvancedSearch(null, page + 1);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* ------------------------------
          Sleek Sliding Tab Toggle
      ------------------------------ */}
      <div className="relative flex w-full max-w-md mx-auto bg-gray-200 rounded-full p-1 mb-8">
        {/* Sliding Indicator */}
        <div
          className={`absolute top-1 left-1 h-10 w-1/2 bg-blue-600 rounded-full transition-all duration-300 ${
            isAdvanced ? "translate-x-full" : "translate-x-0"
          }`}
        ></div>

        {/* Tabs */}
        <button
          onClick={() => setIsAdvanced(false)}
          className={`flex-1 z-10 py-2 text-center font-medium transition-colors duration-300 ${
            !isAdvanced ? "text-white" : "text-gray-700"
          }`}
        >
          Basic
        </button>
        <button
          onClick={() => setIsAdvanced(true)}
          className={`flex-1 z-10 py-2 text-center font-medium transition-colors duration-300 ${
            isAdvanced ? "text-white" : "text-gray-700"
          }`}
        >
          Advanced
        </button>
      </div>

      {/* ------------------------------
          BASIC SEARCH SECTION
      ------------------------------ */}
      {!isAdvanced && (
        <div className="mb-10">
          <form onSubmit={handleBasicSearch} className="flex gap-2 mb-4">
            <input
              type="text"
              value={basicQuery}
              onChange={(e) => setBasicQuery(e.target.value)}
              placeholder="Search GitHub user"
              className="border p-2 w-full rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {basicResult?.type === "single" && (
            <div className="mt-4 border p-4 rounded flex items-center gap-4">
              <img
                src={basicResult.data.avatar_url}
                alt={basicResult.data.login}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold">{basicResult.data.login}</h3>
                <a
                  href={basicResult.data.html_url}
                  className="text-blue-500 underline"
                  target="_blank"
                >
                  View Profile
                </a>
              </div>
            </div>
          )}

          {basicResult?.type === "multiple" && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">Search Results:</h3>
              {basicResult.data.map((user) => (
                <div key={user.id} className="flex items-center gap-3 mb-3">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-12 h-12 rounded-full"
                  />
                  <a
                    href={user.html_url}
                    target="_blank"
                    className="text-blue-500"
                  >
                    {user.login}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------
          ADVANCED SEARCH SECTION
      ------------------------------ */}
      {isAdvanced && (
        <div>
          <form
            onSubmit={(e) => handleAdvancedSearch(e, 1)}
            className="grid gap-4 sm:grid-cols-3 sm:gap-2 mb-4"
          >
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="Min Repos"
              className="border p-2 rounded w-full"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition col-span-full sm:col-span-3"
            >
              Search
            </button>
          </form>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {advResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {advResults.map((user) => (
                <div
                  key={user.id}
                  className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col items-center text-center"
                >
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-20 h-20 rounded-full mb-2"
                  />
                  <h2 className="font-bold">{user.login}</h2>
                  {user.location && <p>Location: {user.location}</p>}
                  <p>Repos: {user.public_repos}</p>
                  <a
                    href={user.html_url}
                    target="_blank"
                    className="text-blue-500 underline mt-1"
                  >
                    View Profile
                  </a>
                </div>
              ))}
            </div>
          )}

          {advResults.length < totalCount && (
            <button
              onClick={handleLoadMore}
              className="mt-6 bg-gray-800 text-white p-2 rounded hover:bg-gray-900 transition"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
