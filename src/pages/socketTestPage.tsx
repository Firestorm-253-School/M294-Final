import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ApiGet } from "../components/api";
import socket from "../components/sockets/socket";

export interface ISocketTestPageProps {}

const SocketTestPage: React.FC<ISocketTestPageProps> = (props) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const { userId } = useParams();
  const [songs, setSongs] = useState<any[]>([]);
  const [phase, setPhase] = useState("idle");
  const [timeToNextPhase, setTimeToNextPhase] = useState(0);
  const [intervalId, setIntervalId] = useState<number>();

  useEffect(() => {
    const handleLivefeedMessage = (data: any) => {
      console.log(data);
      setMessages((messages) => [data, ...messages]);
    };

    const handleError = (data: any) => {
      console.log(data);
    };

    const handleLivefeedInitData = (data: any) => {
      console.log(data);
      setMessages(data.messages);
      setSongs(data.requests);
      setPhase(data.phase);
    };

    const handleLivefeedRequestSong = (data: any) => {
      console.log(data);
      setSongs((songs) => [...songs, data]);
    };

    const handleLivefeedRequestPhase = (data: any) => {
      console.log(data);
      setPhase("request");

      startCountdown(
        Math.round(
          (new Date(data.votingTime).getTime() - new Date().getTime()) / 1000
        )
      );
    };

    const handleLivefeedVotingPhase = (data: any) => {
      console.log(data);
      setPhase("voting");
      startCountdown(
        Math.round(
          (new Date(data.playingTime).getTime() - new Date().getTime()) / 1000
        )
      );
    };

    const handleLivefeedPlaySong = (data: any) => {
      console.log(data);
      setPhase("playing");
      startCountdown(
        Math.round(
          (new Date(data.nextRequest).getTime() - new Date().getTime()) / 1000
        )
      );
    };

    socket.on("error", handleError);
    socket.on("livefeed_message", handleLivefeedMessage);
    socket.on("livefeed_init_data", handleLivefeedInitData);
    socket.on("livefeed_request_song", handleLivefeedRequestSong);
    socket.on("livefeed_request_phase", handleLivefeedRequestPhase);
    socket.on("livefeed_voting_phase", handleLivefeedVotingPhase);
    socket.on("livefeed_play_song", handleLivefeedPlaySong);

    return () => {
      socket.off("error", handleError);
      socket.off("livefeed_message", handleLivefeedMessage);
      socket.off("livefeed_init_data", handleLivefeedInitData);
      socket.off("livefeed_request_song", handleLivefeedRequestSong);
      socket.off("livefeed_request_phase", handleLivefeedRequestPhase);
      socket.off("livefeed_voting_phase", handleLivefeedVotingPhase);
      socket.off("livefeed_play_song", handleLivefeedPlaySong);
    };
  }, []);

  const startCountdown = (seconds: number) => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setTimeToNextPhase(seconds);
    const newIntervalId = setInterval(() => {
      setTimeToNextPhase((prev) => {
        if (prev <= 1) {
          clearInterval(newIntervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const sendLivefeedMessage = () => {
    console.log("Sending livefeed message");
    socket.emit("livefeed_message", { message: message });
  };

  const leaveLivefeed = () => {
    console.log("Leaving livefeed");
    socket.emit("leave_livefeed");
  };

  const joinLivefeed = () => {
    console.log("Joining livefeed");
    socket.emit("join_livefeed", { livefeedId: 1 });
  };

  const requestSong = () => {
    console.log("Requesting song");
    socket.emit("livefeed_request_song", { videoId: "i8ZsbAdLQD8" });
  };

  const voteSong = () => {
    console.log("Voting song");
    socket.emit("livefeed_vote_song", { requestedSongId: 1 });
  };

  return (
    <>
      <h1>Chat with {userId}</h1>
      <div className="flex flex-col-reverse">
        {messages.map((message) => (
          <p>{message.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        className="input"
      />
      <button onClick={() => sendLivefeedMessage()} className="btn">
        Send Message
      </button>
      <button onClick={() => joinLivefeed()} className="btn">
        Join Livefeed
      </button>
      <button onClick={() => leaveLivefeed()} className="btn">
        Leave Livefeed
      </button>
      <button className="btn" onClick={() => requestSong()}>
        Request
      </button>
      <button className="btn" onClick={() => voteSong()}>
        Vote
      </button>
      <h1>
        {phase} ({timeToNextPhase})
      </h1>
      <div>
        {songs.map((song) => (
          <>
            <img src={song.thumbnailUrl} alt="" />
            <p>{song.title}</p>
          </>
        ))}
      </div>
    </>
  );
};

export default SocketTestPage;
