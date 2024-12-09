import { useState, useEffect } from "react";

import { ApiGet } from "../api";
import Post from "../../interfaces/Post";
import PostItem from "./PostItem";

export interface IPostsContainerProps {}

const PostsContainer: React.FC<IPostsContainerProps> = (props) => {
	const [posts, setPosts] = useState<Record<number, Post>>({});
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const posts = await ApiGet("posts");
			setPosts(posts);
			setLoading(false);
		})();
	}, []);

	if (isLoading) {
		<h1>Loading...</h1>;
	}

	return (
		<>
			<h1>Post Container</h1>
			{Object.values(posts)
				.sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime())
				.map((post: Post) => (
					<div key={post.id}>
						<PostItem
							post={post}
							/*callback_update={(updated_post: Post) => {
								setPosts((prevPosts) => ({
									...prevPosts,
									[updated_post.id]: updated_post,
								}));
							}}*/
							callback_remove={() => {
								const updated_posts = { ...posts };
								delete updated_posts[post.id];
								setPosts(updated_posts);
							}}
						/>
				</div>
			))}
		</>
	);
};

export default PostsContainer;
