import React, { useEffect, useState } from "react";
import { ApiDelete, ApiPost } from "../api";

export interface IReactionContainerProps {
  postId: number;
  likes: number;
  dislikes: number;
  rating: number;
}

const ReactionContainer: React.FC<IReactionContainerProps> = ({
  postId,
  likes,
  dislikes,
  rating,
}) => {
  const baseLikes = likes - (rating == 1 ? 1 : 0);
  const baseDislikes = dislikes - (rating == 0 ? 1 : 0);

  const [newRating, setNewRating] = useState(rating);
  useEffect(() => {
    rating = rating;
  }, [rating]);

  const rate = async (rating: number) => {
    await ApiPost(
      { isPositive: rating == 1 ? true : false },
      `posts/${postId}/rate`
    );
  };

  const deleteRate = async () => {
    await ApiDelete(`posts/${postId}/rate`);
  };

  const like = async () => {
    if (newRating == 1) {
      console.log("Already liked -> dislike");
      setNewRating(-1);
      deleteRate();
    } else {
      console.log("Like");
      setNewRating(1);
      rate(1);
    }
  };

  const dislike = async () => {
    if (newRating == 0) {
      console.log("Already disliked -> like");
      setNewRating(-1);
      deleteRate();
    } else {
      console.log("Dislike");
      setNewRating(0);
      rate(0);
    }
  };

  return (
    <div className="reaction-container">
      <button
        className={`btn btn-sm ${newRating == 1 ? "bg-bg-200" : ""}`}
        onClick={() => like()}
      >
        👍 {baseLikes + (newRating == 1 ? 1 : 0)}
      </button>
      <button
        className={`btn btn-sm ${newRating == 0 ? "bg-bg-200" : ""}`}
        onClick={() => dislike()}
      >
        👎 {baseDislikes + (newRating == 0 ? 1 : 0)}
      </button>
    </div>
  );
};

export default ReactionContainer;
