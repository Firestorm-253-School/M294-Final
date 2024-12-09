import { useEffect, useState } from "react";

import { ApiPost, ApiGet } from "../api";
import Post from "../../interfaces/Post";
import Comment from "../../interfaces/Comment";
import CommentItem from "./CommentItem";

export interface ICommentContainerProps {
	post: Post;
}

const CommentContainer: React.FC<ICommentContainerProps> = (props) => {
	const { post } = props;

	const [isLoading, setLoading] = useState(true);
	const [comments, setComments] = useState<Comment[]>([]);

	useEffect(() => {
		(async () => {
			setLoading(true);
            const comments = await ApiGet(`posts/${post.id}/comments`)
			setComments(comments);
			setLoading(false);
		})();
	}, []);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
		  <h3 className="title-highlight">Comments</h3> {/* Verwendet die 'title-highlight' Klasse */}
		  <div className="comments-container"> {/* Verwendet die 'comments-container' Klasse */}
			{comments.map((comment: Comment) => (
			  <div key={comment.id} className="comment-item-container"> {/* Nutzt die 'comment-item-container' Klasse */}
				<CommentItem comment={comment} />
			  </div>
			))}
		  </div>
		  <br />
		</>
	  );
	  
	  
	  
};

export default CommentContainer;
