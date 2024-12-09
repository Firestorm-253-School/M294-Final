import { ApiDelete, ApiGet } from "../components/api";

export default interface Comment {
	id: number;
	post_id: number;
	user_id: number;
	content: string;
	created_at: Date;
}

export async function GetComments(post_id: number) {
	const comments: Comment[] = await ApiGet(`posts/${post_id}/comments`);

	const dict: Record<number, Comment> = comments.reduce(
		(array: any, comment: Comment) => {
			comment.created_at = new Date(comment.created_at);
			array[comment.id] = comment;
			return array;
		},
		{}
	);
	return dict;
}

export async function DeleteComment(comment: Comment) {
	return await ApiDelete(`posts/${comment.post_id}/comments/${comment.id}`);
}
