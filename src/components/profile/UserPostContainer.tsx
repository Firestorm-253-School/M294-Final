import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ApiGet } from "../api";
import PostItemSmall from "./PostItemSmall";

export interface IUserPostContainerProps {
  userId: number;
  activeTab: string;
}

const UserPostContainer: React.FC<IUserPostContainerProps> = (props) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0); // Use state for page

  useEffect(() => {
    console.log("test");
    setPosts([]);
    setHasMore(true);
    setPage(0);
    fetchMoreData(0);
  }, [props.activeTab]);

  const fetchMoreData = async (page: number) => {
    console.log(page);

    const response = await ApiGet(
      `profiles/${props.userId}/${props.activeTab}/${page}`
    );
    console.log(response);
    setPosts((prevPosts) => [...prevPosts, ...response.response.results]);
    if (response.response.page >= response.response.totalPages) {
      setHasMore(false);
    }
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => fetchMoreData(page)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        className="flex flex-row flex-wrap gap-10 w-full items-center justify-center"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {posts.map((post, index) => (
          <PostItemSmall post={post} key={index} />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default UserPostContainer;
