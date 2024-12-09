import { useEffect, useState } from "react";

import Post from "../../interfaces/Post";
import MediaLink from "../../interfaces/MediaLink";
import User, { GetUserById } from "../../interfaces/User";
import ReactionContainer from "./ReactionContainer";
import CommentContainer from "./CommentContainer";

export interface IPostItemProps {
  post: Post;
  openPopup: Function;
}

const PostItem: React.FC<IPostItemProps> = (props) => {
  const { post } = props;
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setUser(await GetUserById(post.user_id));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (user == null) {
    return <h1>No user found</h1>;
  }

  return (
    <>
      <h3>{post.content}</h3>
      <p>User: {user.username}</p>
      <p>Created: {post.created_at.toString()}</p>
      <p>Updated: {post.updated_at.toString()}</p>
      {post.medialinks.map((medialink: MediaLink) => (
        <div>
          <p>{medialink.url}</p>
        </div>
      ))}
      <button onClick={() => props.openPopup(props.post)}>Edit</button>
      <ReactionContainer post={post} />
      <CommentContainer post={post} />
      <br />
    </>
  );
};

export default PostItem;
