import Reaction from "../../interfaces/Reaction";

export interface IReactionContainerProps {
	reactions: Reaction[];
}

const ReactionContainer: React.FC<IReactionContainerProps> = (props) => {
	const { reactions } = props;

    let thumbs_up = 0
    let thumbs_down = 0

    reactions.forEach((reaction: Reaction) => 
    {
        switch(reaction.emoji) {
            case '👍':
                thumbs_up += 1
                break;
            case '👎':
                thumbs_down += 1
                break;
            default:
                console.error("invalid emoji: ", reaction.emoji);
                break;
          }
    })


	return (
		<>
            <p>👍 {thumbs_up}</p>
            <p>👎 {thumbs_down}</p>
			<br />
		</>
	);
};

export default ReactionContainer;
