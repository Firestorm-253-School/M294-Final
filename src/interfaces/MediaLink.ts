export default interface MediaLink {
	id: number;
	post_id: number;
	source: string; // e.g., "YouTube", "Spotify", "Twitch"
	url: string;
	created_at: Date;
}
