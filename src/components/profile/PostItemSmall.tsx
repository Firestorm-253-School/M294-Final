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
  console.log("Likes:", post.likes, "Dislikes:", post.dislikes); // Überprüfung

  return (
    <div className="card bg-post-bg w-72 shadow-xl text-neutral-950">
      <div className="card-body p-5 gap-5">
        <h2 className="card-title">{post.user.displayName}</h2>
        <p>{post.content}</p>
        <div className="card-actions flex flex-row items-center justify-between mt-4">
          <div className="flex flex-row items-center gap-2">
            <ThumbsUp className="text-green-500" />
            <span className="text-sm">{post.likes}</span>
            <ThumbsDown className="text-red-500" />
            <span className="text-sm">{post.dislikes}</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <MessageSquareText className="text-blue-500" />
            <Bookmark className="text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItemSmall;
