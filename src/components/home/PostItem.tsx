import { useEffect, useState } from "react";

import Post from "../../interfaces/Post";
import MediaLink from "../../interfaces/MediaLink";
import User, { GetUserById } from "../../interfaces/User";
import ReactionContainer from "./ReactionContainer";
import CommentContainer from "./CommentContainer";

export interface IPostItemProps {
  post: Post;
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
    <div className="post-box">
      <h3 className="text-xl text-primary spacing">{post.content}</h3>
      <div className="text-small spacing">
        <p className="text-small text-right">
          <span className="text-secondary">User:</span> {user.username}
        </p>
        <p className="text-small text-right">
          <span className="text-secondary">Created:</span>{" "}
          {new Date(post.created_at).toLocaleString()}
        </p>
        <p className="text-small text-right">
          <span className="text-secondary">Updated:</span>{" "}
          {new Date(post.updated_at).toLocaleString()}
        </p>
      </div>
      {post.medialinks.length > 0 && (
        <div className="spacing">
          <h4 className="title-highlight">Media Links:</h4>
          <ul>
            {post.medialinks.map((medialink: MediaLink, index) => (
              <li key={index}>
                <a
                  href={medialink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {medialink.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <ReactionContainer post={post} />
        <CommentContainer post={post} />
      </div>
    </div>
  );
};

export default PostItem;
