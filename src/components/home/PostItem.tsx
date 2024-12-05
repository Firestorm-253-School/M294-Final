import MediaLink from "../../interfaces/MediaLink";
import Post from "../../interfaces/Post";

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
			{post.medialinks.map((medialink: MediaLink) => (
				<div>
                    <p>Media Link: {medialink.url}</p>
                </div>
			))}
            <br/>
		</>
	);
};

export default PostItem;
