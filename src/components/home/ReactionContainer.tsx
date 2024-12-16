import React from 'react';
import { PostReactions } from '../../interfaces/Post';

export interface IReactionContainerProps {
  postId: number;
  reactions?: PostReactions[];
}

const ReactionContainer: React.FC<IReactionContainerProps> = ({ postId, reactions = [] }) => {
  return (
    <div className="reaction-container">
      {reactions.length > 0 ? (
        reactions.map((reaction, index) => (
          <div key={index} className="reaction-item">
            {reaction.type}: {reaction.count}
          </div>
        ))
      ) : (
        <p>No reactions yet.</p>
      )}
    </div>
  );
};

export default ReactionContainer;
