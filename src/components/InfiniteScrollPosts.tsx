import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GetPosts } from '../interfaces/Post';
import PostItem from './home/PostItem';

const InfiniteScrollPosts: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    const response = await GetPosts(page);
    if (response.length === 0) {
      setHasMore(false);
      return;
    }
    setPosts([...posts, ...response]);
    setPage(page + 1);
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {posts.map((post, index) => (
       <PostItem
       post={post}
       callback_remove={() => {
         const updated_posts = { ...posts };
         delete updated_posts[post.id];
         setPosts(updated_posts);
       }}
     />
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollPosts;