// import { useParams } from "react-router-dom";

// const BlogPost = () => {
//   const { postId } = useParams();

//   return (
//     <div>
//       <h2>Blog Post</h2>
//       <p>Post ID: {postId}</p>
//     </div>
//   );
// };

// export default BlogPost;







import { useParams } from "react-router-dom";

const BlogPost = () => {
  const params = useParams();
  const postId = params.postId || params.id; // handle both /blog/:id and /posts/:postId
  return (
    <div>
      <h2>Blog Post</h2>
      <p>Post ID: {postId}</p>
    </div>
  );
};

export default BlogPost;
