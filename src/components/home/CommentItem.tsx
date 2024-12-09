import { useState, useEffect } from "react";

import Comment, { DeleteComment } from "../../interfaces/Comment"
import User, { GetUserById } from "../../interfaces/User";

export interface ICommentItemProps
{
    comment: Comment;
	callback_remove: () => void;
};

const CommentItem: React.FC<ICommentItemProps> = (props) => {
    const { comment, callback_remove } = props;

	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
		(async () => {
			setLoading(true);
			setUser(await GetUserById(comment.user_id));
			setLoading(false);
		})();
	}, []);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

    return (
		<>
			<span className="font-semibold">{user?.username}:</span> "{comment.content}"
			<p className="text-sm flex justify-between items-center">
				{comment.user_id == Number(localStorage.getItem("user_id")) && (
					<button
						onClick={() => {
							DeleteComment(comment);
							callback_remove();
						}}
						className="btn btn-primary btn-sm ml-auto"
					>
						Delete
					</button>
				)}
			</p>
		</>
	);
};

export default CommentItem
