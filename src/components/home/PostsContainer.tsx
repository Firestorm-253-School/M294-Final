import { useState, useEffect } from "react";

import { ApiGet } from "../api";
import Post from "../../interfaces/Post";
import PostItem from "./PostItem";
import EditPostPopup from "../Popups/EditPostPopup";

export interface IPostsContainerProps {}

const PostsContainer: React.FC<IPostsContainerProps> = (props) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [editPostPopup, setEditPostPopup] = useState<any>(null);

  const openPopup = (post: Post) => {
    setEditPostPopup(post);
  };

  const closePopup = () => {
    setEditPostPopup(null);
  };

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
      <EditPostPopup
        postObject={editPostPopup}
        isOpen={editPostPopup != null ? true : false}
        closePostPopup={closePopup}
      ></EditPostPopup>
      <h1>Post Container</h1>
      {posts.map((post: Post) => (
        <div>
          <PostItem openPopup={openPopup} post={post} />
        </div>
      ))}
    </>
  );
};

export default PostsContainer;
