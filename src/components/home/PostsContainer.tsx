import { useState, useEffect } from "react";

import { Get } from "../api";
import Post from "../../interfaces/Post";
import PostItem from "./PostItem";

export interface IPostsContainerProps {}

const PostsContainer: React.FC<IPostsContainerProps> = (props) => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setLoading] = useState(true);

	localStorage.setItem(
		"auth_token",
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImVtYWlsIjoibC56MkBjb20iLCJpYXQiOjE3MzMzOTA5MzksImV4cCI6MTczMzQ3NzMzOX0.Wy3na0K0iJCWgoZUnFehE1LxDMMp8D-kohPhl8UNZ-E"
	);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const posts = await Get("posts");
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
			{posts.map((post: Post) => (
				<div>
					<PostItem post={post} />
				</div>
			))}
		</>
	);
};

export default PostsContainer;
