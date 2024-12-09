import { useEffect, useState } from "react";

import Post from "../../interfaces/Post";
import Comment, { GetComments } from "../../interfaces/Comment";
import CommentItem from "./CommentItem";
import CreateCommentForm from "../forms/CreateCommentForm";

export interface ICommentContainerProps {
  post: Post;
}

const CommentContainer: React.FC<ICommentContainerProps> = (props) => {
  const { post } = props;

  const [comments, setComments] = useState<Record<number, Comment>>({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const comments = await GetComments(post.id);
      setComments(comments);
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h3 className="title-highlight">Comments</h3>{" "}
      {/* Verwendet die 'title-highlight' Klasse */}
      <CreateCommentForm
        postId={props.post.id}
        createCommentCallback={async () => {
          //add comment on client side
          const comments = await GetComments(post.id);
          setComments(comments);
        }}
      ></CreateCommentForm>
      <div className="comments-container">
        {" "}
        {/* Verwendet die 'comments-container' Klasse */}
        {Object.values(comments)
          .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
          .map((comment: Comment) => (
            <div key={comment.id}>
              <CommentItem
                comment={comment}
                callback_remove={() => {
                  const updated_comments = { ...comments };
                  delete updated_comments[comment.id];
                  setComments(updated_comments);
                }}
              />
            </div>
          ))}
      </div>
      <br />
    </>
  );
};

export default CommentContainer;
