import React, { useState } from "react";
import MediaLink from "../../interfaces/MediaLink";
import ReactionContainer from "./ReactionContainer";
import CommentSection from "./CommentSection"; // New component for comments
import { Post } from "../../interfaces/Post";

export interface IPostItemProps {
  post: Post;
}

const PostItem: React.FC<IPostItemProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

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
        <ReactionContainer postId={post.postId} reactions={post.reactions || []} />
        <button
          onClick={() => setShowComments(!showComments)}
          className="btn btn-primary mt-4"
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
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
