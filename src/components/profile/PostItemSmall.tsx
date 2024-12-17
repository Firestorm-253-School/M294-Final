import {
  Bookmark,
  MessageSquareText,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Post } from "../../interfaces/Post";

export interface IPostItemSmallProps {
  post: Post;
}

const PostItemSmall: React.FC<IPostItemSmallProps> = (props) => {
  const post = props.post;
  return (
    <>
      <div className="card bg-post-bg w-72 shadow-xl text-neutral-950">
        <div className="card-body p-5 gap-5">
          <h2 className="card-title">{post.user.displayName}</h2>
          <p>{post.content}</p>
          <div className="card-actions flex flex-row items-center justify-between">
            <div className="flex flex-row gap-4">
              <ThumbsUp fill="none" />
              <ThumbsDown />
            </div>

            <MessageSquareText />
            <Bookmark />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItemSmall;
