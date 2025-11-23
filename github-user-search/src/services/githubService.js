//// This function returns a list of users that match the search term
// import axios from "axios";

// const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;

// export const searchUsers = async (query) => {
//   const response = await axios.get(`https://api.github.com/search/users?q=${query}`, {
//     headers: {
//       Authorization: apiKey ? `token ${apiKey}` : undefined,
//     },
//   });
//   return response.data;
// };







////This returns that single user’s full profile info.
// import axios from "axios";

// export const fetchUserData = async (username) => {
//   const url = `https://api.github.com/users/${username}`;

//   const response = await axios.get(url);
//   return response.data;
// };








import axios from "axios";

const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
const config = {
  headers: { Authorization: apiKey ? `token ${apiKey}` : undefined },
};

// ------------------------------
// 1. Direct user lookup (Basic)
// ------------------------------
<<<<<<< HEAD
export const fetchUserDataDir = async (username) => {
=======
export const fetchUserData = async (username) => {
>>>>>>> af944cc7b7245d29971b6f88823a39a6ad990f14
  const url = `https://api.github.com/users/${username}`;
  const response = await axios.get(url, config);
  return response.data;
};

// ------------------------------
// 2. Advanced search with filters & pagination
// ------------------------------
export const searchUsers = async ({
  username = "",
  location = "",
  minRepos = "",
  page = 1,
  per_page = 10,
}) => {
  let query = "";
  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}&page=${page}&per_page=${per_page}`;

  const response = await axios.get(url, config);

  // Fetch full user details for each result
  const detailedUsers = await Promise.all(
    response.data.items.map(async (user) => {
      const userDetails = await axios.get(user.url, config);
      return userDetails.data;
    })
  );

  return {
    users: detailedUsers,
    total_count: response.data.total_count,
  };
};

// ------------------------------
// 3. Combined logic (Basic Search)
// Try exact user lookup first, fallback to keyword search
// ------------------------------
<<<<<<< HEAD
export const fetchUserData = async (query) => {
  try {
    const exactUser = await fetchUserDataDir(query);
=======
export const combinedSearch = async (query) => {
  try {
    const exactUser = await fetchUserData(query);
>>>>>>> af944cc7b7245d29971b6f88823a39a6ad990f14
    return {
      type: "single",
      data: exactUser,
    };
  } catch (_) {
    // If exact match fails, fallback to keyword search (basic search)
    const result = await searchUsers({ username: query, per_page: 10, page: 1 });
    return {
      type: "multiple",
      data: result.users,
    };
  }
};
