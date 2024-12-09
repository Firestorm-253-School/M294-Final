import { useState } from "react";

import { ApiPost, ApiGet } from "../api";
import Post from "../../interfaces/Post";
import Reaction from "../../interfaces/Reaction";

export interface IReactionContainerProps {
	post: Post;
}

const ReactionContainer: React.FC<IReactionContainerProps> = (props) => {
	const { post } = props;

    const [ current_state, setPost] = useState(post)
    const { thumbs_up, thumbs_down } = get_likes(current_state.reactions)

	const handleClick = async (emoji: string) => {
        await ApiPost({ reaction: emoji }, `posts/${post.id}/react`);

        const updated_post = await ApiGet("posts/" + post.id);
        setPost(updated_post)
	};

	return (
		<>
		  <div className="reaction-buttons-container">
			<button 
			  onClick={() => handleClick("👍")} 
			  className="reaction-button thumbs-up"
			>
			  👍 {thumbs_up}
			</button>
			<button 
			  onClick={() => handleClick("👎")} 
			  className="reaction-button thumbs-down"
			>
			  👎 {thumbs_down}
			</button>
		  </div>
		  <br />
		</>
	  );
	  
};

function get_likes(reactions: Reaction[]) {
	let thumbs_up = 0;
	let thumbs_down = 0;

	reactions.forEach((reaction: Reaction) => {
		switch (reaction.emoji) {
			case "👍":
				thumbs_up += 1;
				break;
			case "👎":
				thumbs_down += 1;
				break;
			default:
				console.error("invalid emoji: ", reaction.emoji);
				break;
		}
	});

	return { thumbs_up: thumbs_up, thumbs_down: thumbs_down };
}

export default ReactionContainer;
