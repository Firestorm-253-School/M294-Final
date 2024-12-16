import MediaLink from "../../interfaces/MediaLink";
import ReactionContainer from "./ReactionContainer";
import CommentContainer from "./CommentContainer";
import { Post } from "../../interfaces/Post";

export interface IPostItemProps {
  post: Post;
}

const PostItem: React.FC<IPostItemProps> = (props) => {
  const { post} = props;

  return (
    <div className="post-box">
      <h3 className="text-xl text-primary spacing">{post.content}</h3>
      <div className="text-small spacing">
        <p className="text-small text-right">
          <span className="text-secondary">User:</span> {post.user.username}
        </p>
        {/* <p className="text-small text-right">
          <span className="text-secondary">Created:</span>{" "}
          {new Date(post.created_at).toLocaleString()}
        </p>
        <p className="text-small text-right">
          <span className="text-secondary">Updated:</span>{" "}
          {new Date(post.updated_at).toLocaleString()}
        </p> */}
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
      <ReactionContainer postId={post.id} reactions={post.reactions || []} />
      {/* <CommentContainer post={post} /> */}
    </div>
  );
};

export default PostItem;
