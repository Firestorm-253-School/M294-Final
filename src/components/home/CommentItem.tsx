import { useState, useEffect } from "react";

import Comment from "../../interfaces/Comment"
import User, { GetUserById } from "../../interfaces/User";

export interface ICommentItemProps
{
    comment: Comment
};

const CommentItem: React.FC<ICommentItemProps> = (props) => {
    const { comment } = props;

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
            <p>
                {user?.username}: "{comment.content}"
            </p>
        </>
    );
};

export default CommentItem
