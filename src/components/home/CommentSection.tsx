import React, { useState, useEffect } from "react";
import { ApiGet, ApiPost } from "../api";

export interface ICommentSectionProps {
  postId: number;
}

const CommentSection: React.FC<ICommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const response = await ApiGet(`posts/${postId}/comments`);
      if (response && response.status === "success") {
        setComments(response.response);
      } else {
        console.error("Failed to fetch comments:", response);
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    const commentObject = {
      comment: newComment,
    };
    const response = await ApiPost(commentObject, `posts/${postId}/comments`);
    if (response && response.status === "success") {
      const CommentRespose = await ApiGet(`posts/${postId}/comments`)
      setComments(CommentRespose.response);
      
      setNewComment("");

    } else {
      console.error("Failed to add comment:", response);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-xl text-primary spacing">Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.commentId}>
            {comment.user ? (
              <>
                <span className="font-semibold">{comment.user.username}:</span> "{comment.comment}"
              </>
            ) : (
              <span>Unknown user: "{comment.comment}"</span>
            )}
          </li>
        ))}
      </ul>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write your comment here..."
        className="textarea textarea-bordered w-full mb-4"
      />
      <button onClick={handleAddComment} className="btn btn-primary w-full">
        Add Comment
      </button>
    </div>
  );
};

export default CommentSection;