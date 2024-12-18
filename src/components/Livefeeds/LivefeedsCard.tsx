import React from 'react';
import './LivefeedsCard.css';

export interface ILivefeedsCardProps {
    feed: {
        title: string;
        username: string;
        chatters: number;
        followers: number;
        description?: string;
        cooldown?: number;
    };
    onFollow: (username: string) => void;
    onJoin: (title: string) => void;
}

const LivefeedsCard: React.FC<ILivefeedsCardProps> = ({ feed, onFollow, onJoin }) => {
    return (
        <div className="livefeed-card">
            <div className="livefeed-info">
                <h3>{feed.title}</h3>
                <div className='chatter'>🔴 {feed.chatters} Chatters</div>
            </div>
            <div className="chatters">
                <p>@{feed.username}</p>
                {feed.cooldown !== undefined && <p className="cooldown">Cooldown: {feed.cooldown} min</p>}
            </div>
            <div className="actions">
                <button className="follow-btn" onClick={() => onFollow(feed.username)}>Follow</button>
                <p className="followers">{feed.followers} Followers</p>
                <button className="join-btn" onClick={() => onJoin(feed.title)}>Join</button>
            </div>

        </div>
    );
};

export default LivefeedsCard;