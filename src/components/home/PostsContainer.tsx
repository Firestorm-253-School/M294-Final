import { useState, useEffect } from "react";

import { ApiGet } from "../api";
import Post from "../../interfaces/Post";
import PostItem from "./PostItem";

export interface IPostsContainerProps {}

const PostsContainer: React.FC<IPostsContainerProps> = (props) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const posts = await ApiGet("posts");
      setPosts(posts);
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Post Container</h1>
      {posts.map((post: Post) => (
        <div>
          <PostItem post={post} />
        </div>
      ))}
    </>
  );
};

export default PostsContainer;
