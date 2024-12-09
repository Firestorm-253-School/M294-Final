import { useState, useEffect } from "react";

import Post, { GetPosts } from "../../interfaces/Post";
import PostItem from "./PostItem";
import EditPostPopup from "../Popups/EditPostPopup";
import YoutubeIframe from "../iframes/YoutubeIframe";
import SpotifyIframe from "../iframes/SpotifyIframe";

export interface IPostsContainerProps {}

const PostsContainer: React.FC<IPostsContainerProps> = (props) => {
  const [posts, setPosts] = useState<Record<number, Post>>({});
  const [isLoading, setLoading] = useState(true);
  const [editPostPopup, setEditPostPopup] = useState<any>(null);
  const [iframeOpen, setIframeOpen] = useState(-1);
  const [videoId, setVideoId] = useState("");
  const [trackId, setTrackId] = useState("");

  const openPopup = (post: Post) => {
    setEditPostPopup(post);
  };

  const closePopup = () => {
    setEditPostPopup(null);
  };

  const extractYouTubeVideoID = (url: string) => {
    const params = new URL(url).searchParams;
    return params.get("v");
  };

  function extractSpotifyTrackID(url: string) {
    const parts = url.split("/"); // Split the URL by '/'
    return parts[parts.length - 1]; // The last part of the URL is the track ID
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const posts = await GetPosts();
      setPosts(posts);
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <YoutubeIframe
        isOpen={iframeOpen == 0}
        videoId={videoId}
        closeIframe={() => setIframeOpen(-1)}
      ></YoutubeIframe>
      <SpotifyIframe
        isOpen={iframeOpen == 1}
        trackId={trackId}
        closeIframe={() => setIframeOpen(-1)}
      ></SpotifyIframe>
      <h1>Post Container</h1>
      <EditPostPopup
        postObject={editPostPopup}
        isOpen={editPostPopup != null ? true : false}
        closePostPopup={closePopup}
      ></EditPostPopup>
      <div className="container-center">
        {Object.values(posts)
          .sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime())
          .map((post: Post) => (
            <div key={post.id}>
              <PostItem
                post={post}
                callback_remove={() => {
                  const updated_posts = { ...posts };
                  delete updated_posts[post.id];
                  setPosts(updated_posts);
                }}
                openPopup={openPopup}
                openIframe={(source: string, videoUrl: string) => {
                  if (source == "Youtube") {
                    const videoId = extractYouTubeVideoID(videoUrl);
                    if (videoId) {
                      setVideoId(videoId);
                    }
                    setIframeOpen(0);
                  }
                  if (source == "Spotify") {
                    const trackId = extractSpotifyTrackID(videoUrl);
                    if (trackId) {
                      setTrackId(trackId);
                    }
                    setIframeOpen(1);
                  }
                }}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default PostsContainer;
