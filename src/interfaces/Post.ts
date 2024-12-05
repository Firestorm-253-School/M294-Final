import Reaction from "./Reaction";
import MediaLink from "./MediaLink";

export default interface Post {
	id: number;
	user_id: number;
	content: string;
	created_at: Date;
	updated_at: Date;
	medialinks: MediaLink[];
	reactions: Reaction[];
}
