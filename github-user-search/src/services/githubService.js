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








// Combined API Logic(Best Practice)
// Try exact user match first
// If exact match fails, fall back to keyword search

import axios from "axios";

const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;

const config = {
  headers: {
    Authorization: apiKey ? `token ${apiKey}` : undefined,
  },
};

// 1. Direct user lookup
export const fetchUserData = async (username) => {
  const url = `https://api.github.com/users/${username}`;
  const response = await axios.get(url, config);
  return response.data;
};

// 2. Search for multiple users
export const searchUsers = async (query) => {
  const url = `https://api.github.com/search/users?q=${query}`;
  const response = await axios.get(url, config);
  return response.data.items;
};

// 3. Combined logic
export const combinedSearch = async (query) => {
  try {
    // Try exact user lookup
    const exactUser = await fetchUserData(query);
    return {
      type: "single",
      data: exactUser,
    };
  } catch (_) {
    // If exact match fails, use keyword search
    const users = await searchUsers(query);
    return {
      type: "multiple",
      data: users,
    };
  }
};
