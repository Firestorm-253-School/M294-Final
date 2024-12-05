export default interface Reaction {
	id: number;
	post_id: number;
	user_id: number;
	emoji: string;
	created_at: Date;
}
