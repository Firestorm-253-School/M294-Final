import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ApiGet } from "../api";
import PostItemSmall from "./PostItemSmall";

export interface IUserPostContainerProps {
  userId: number;
}

const UserPostContainer: React.FC<IUserPostContainerProps> = (props) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    console.log("test");

    const response = await ApiGet(`profiles/${props.userId}/posts/${page}`);
    console.log(response);
    setPosts((prevPosts) => [...prevPosts, ...response.response.results]);
    setPage(page + 1);
  };

  return (
    <>
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
          <PostItemSmall key={index} />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default UserPostContainer;
