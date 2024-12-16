import {
  Bookmark,
  MessageSquareText,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

export interface IPostItemSmallProps {}

const PostItemSmall: React.FC<IPostItemSmallProps> = (props) => {
  return (
    <>
      <div className="card bg-post-bg w-72 shadow-xl text-neutral-950">
        <div className="card-body p-5 gap-5">
          <h2 className="card-title">Simon</h2>
          <p>Hi, this is the first Post! Look at this Post</p>
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
