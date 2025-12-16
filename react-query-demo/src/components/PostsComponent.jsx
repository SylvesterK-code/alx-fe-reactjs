
// // react-query-demo/src/components/PostsComponent.jsx

// import React from "react";
// import { useQuery } from "@tanstack/react-query";

// const fetchPosts = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   if (!res.ok) throw new Error("Failed to fetch posts");
//   return res.json();
// };

// const PostsComponent = () => {
//   const {
//     data: posts,
//     isLoading,
//     isError,
//     error,
//     refetch,
//     isFetching,
//   } = useQuery({
//     queryKey: ["posts"],
//     queryFn: fetchPosts,
//     staleTime: 1000 * 60 * 5,
//   });

//   if (isLoading) return <p>Loading posts...</p>;
//   if (isError) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h2>Posts</h2>
//       <button onClick={refetch}>🔄 Refetch</button>
//       {isFetching && <p>Updating...</p>}

//       <ul>
//         {posts.slice(0, 10).map((post) => (
//           <li key={post.id}>
//             <strong>{post.title}</strong>
//             <p>{post.body}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PostsComponent;







// react-query-demo/src/components/PostsComponent.jsx

import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

const PostsComponent = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading posts...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500 text-lg">
          Error: {error.message}
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Latest Posts
        </h2>

        <button
          onClick={refetch}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition disabled:opacity-50"
          disabled={isFetching}
        >
          {isFetching ? "Refreshing..." : "🔄 Refetch Posts"}
        </button>
      </div>

      {/* Background fetching indicator */}
      {isFetching && (
        <p className="mb-4 text-sm text-gray-500">
          Updating data in the background...
        </p>
      )}

      {/* Posts Grid */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 10).map((post) => (
          <li
            key={post.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-4">
              {post.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostsComponent;
