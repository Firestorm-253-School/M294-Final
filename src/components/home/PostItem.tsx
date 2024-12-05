import Post from "../../interfaces/Post";
import MediaLink from "../../interfaces/MediaLink";
import ReactionContainer from "./ReactionContainer";

export interface IPostItemProps {
	post: Post;
}

const PostItem: React.FC<IPostItemProps> = (props) => {
	const { post } = props;

	return (
		<>
			<h3>{post.content}</h3>
			<p>User: {post.user_id}</p>
			<p>Created: {post.created_at.toString()}</p>
			<p>Updated: {post.updated_at.toString()}</p>
			{post.medialinks.map((medialink: MediaLink) => (
				<div>
                    <p>{medialink.url}</p>
                </div>
			))}
            <ReactionContainer reactions={post.reactions}/>
            <br/>
		</>
	);
};

export default PostItem;
