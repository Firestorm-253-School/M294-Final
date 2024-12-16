import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GetPosts } from "../../interfaces/Post";
import PostItem from "./PostItem";

export interface IPostsContainerProps {}

const PostsContainer: React.FC<IPostsContainerProps> = (props) => {
  // const [isLoading, setLoading] = useState(true);
  // const [editPostPopup, setEditPostPopup] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    const response = await GetPosts(page);
    if (response.page >= response.totalPages) {
      setHasMore(false);
    } else {
      setPosts((prevPosts) => [...prevPosts, ...response.results]);
      setPage(page + 1);
    }
    console.log(response);
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {posts.map((post, index) => (
        <PostItem key={index} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostsContainer;
