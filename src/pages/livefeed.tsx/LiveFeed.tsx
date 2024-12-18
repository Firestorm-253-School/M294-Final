import { useEffect, useState } from "react";
import { ApiGet } from "../../components/api";
import Navbar from "../../components/layout/Navbar";
import LivefeedsCard from "../../components/Livefeeds/LivefeedsCard";

export interface ILiveFeedProps { }

const LiveFeed: React.FC<ILiveFeedProps> = () => {
    const [livefeeds, setLiveFeeds] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await ApiGet(`livefeeds/page/0`); // Die API-Route
                if (!response || !response.response || !response.response.results) {
                    throw new Error('Invalid API response');
                }
                console.log("API Response:", response);
                const livefeedsData = response.response.results.map((feed: any) => ({
                    title: feed.name,
                    username: feed.user.username,
                    chatters: feed.chatters,
                    followers: feed.follower,
                    description: feed.description,
                    cooldown: feed.cooldown,
                })) || []; // Extrahiere und transformiere 'results' sicher
                console.log("Livefeeds Data:", livefeedsData);
                setLiveFeeds(livefeedsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <Navbar />
            {livefeeds.map((feed, index) => (
                <LivefeedsCard
                    key={index}
                    feed={feed}
                    onFollow={(username) => console.log(`Follow ${username}`)}
                    onJoin={(title) => console.log(`Join ${title}`)}
                />
            ))}
        </div>
    );
};

export default LiveFeed;