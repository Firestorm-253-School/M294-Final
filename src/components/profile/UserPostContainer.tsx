import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ApiGet } from "../api";
import PostItemSmall from "./PostItemSmall";
import { Post } from "../../interfaces/Post";

interface IUserPostContainerProps {
  userId: number;
  activeTab: string;
}

const UserPostContainer: React.FC<IUserPostContainerProps> = (props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Active Tab Changed:", props.activeTab);
    setPosts([]);
    setHasMore(true);
    setPage(0);
    fetchMoreData(0);
  }, [props.activeTab, props.userId]);

  const fetchMoreData = async (currentPage: number) => {
    console.log("Fetching Page:", currentPage);

    try {
      // Verwende den funktionierenden Endpunkt
      const response = await ApiGet(`posts/page/${currentPage}`);
      console.log("API Response:", response);

      if (response && response.status === "success") {
        const fetchedPosts: Post[] = response.response.results.map((post: any) => {
          console.log("Mapping Post:", post); // Zusätzliche Log-Ausgabe
          return {
            postId: post.postId,
            user: post.user,
            content: post.content,
            likes: post.likes !== undefined ? post.likes : 0,
            dislikes: post.dislikes !== undefined ? post.dislikes : 0,
            rating: post.rating,
            saved: post.saved,
            medialinks: post.medialinks,
            createdAt: post.createdAt || new Date().toISOString(),
          };
        });

        console.log("Fetched Posts:", fetchedPosts);

        setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);

        if (currentPage >= response.response.totalPages - 1) {
          setHasMore(false);
        } else {
          setPage((prevPage) => prevPage + 1);
        }
      } else {
        console.error("Failed to fetch posts:", response);
        setError("Fehler beim Laden der Posts.");
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Ein Fehler ist aufgetreten.");
      setHasMore(false);
    }
  };

  return (
    <>
      {error && (
        <div className="error-message text-red-500 text-center mb-4">
          {error}
        </div>
      )}
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
        {posts.map((post) => (
          <PostItemSmall post={post} key={post.postId} />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default UserPostContainer;
