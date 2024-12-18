import React, { useState } from "react";
import MediaLink from "../../interfaces/MediaLink";
import ReactionContainer from "./ReactionContainer";
import CommentSection from "./CommentSection"; // New component for comments
import { Post } from "../../interfaces/Post";
import { Bookmark, MessageSquareText } from "lucide-react";
import { ApiDelete, ApiPost } from "../api";

export interface IPostItemProps {
  post: Post;
}

const PostItem: React.FC<IPostItemProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [localSaved, setLocalSaved] = useState(post.saved);

  const save = async () => {
    if (localSaved) await ApiDelete(`posts/${post.postId}/save`);
    else {
      await ApiPost({}, `posts/${post.postId}/save`);
    }
    setLocalSaved(!localSaved);
  };

  return (
    <div className="flex">
      <div className={`post-box ${showComments ? "w-1/2" : "w-full"}`}>
        <h3 className="text-xl text-primary spacing">{post.content}</h3>
        <div className="text-small spacing">
          <p className="text-small text-right">
            <span className="text-secondary">User:</span> {post.user.username}
          </p>
        </div>
        {post.medialinks && post.medialinks.length > 0 && (
          <div className="spacing">
            <h4 className="title-highlight">Media Links:</h4>
            <ul>
              {post.medialinks.map((link: MediaLink, index: number) => (
                <li key={index}>{link.url}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-row items-center justify-between text-text-primary">
          <ReactionContainer
            postId={post.postId}
            likes={post.likes}
            dislikes={post.dislikes}
            rating={post.rating}
          />
          <div className="flex flex-row gap-4">
            <button
              onClick={() => setShowComments(!showComments)}
              className="bg-base-200 hover:bg-base-300 p-2 rounded-lg"
            >
              <MessageSquareText className="h-5 w-5" />
            </button>
            <button
              onClick={() => save()}
              className="bg-base-200 hover:bg-base-300 p-2 rounded-lg"
            >
              <Bookmark
                className={`h-5 w-5 ${localSaved ? "fill-text-primary" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {showComments && (
        <div className="w-1/2 flex flex-col">
          <CommentSection postId={post.postId} />
        </div>
      )}
    </div>
  );
};

export default PostItem;
