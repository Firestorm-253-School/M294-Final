import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ApiGet } from "../components/api";
import socket from "../components/sockets/socket";
import YouTube, { YouTubeProps } from "react-youtube";
import RequestedSong from "../components/livefeed/RequestedSong";
import { SendHorizontal, Volume2, VolumeX } from "lucide-react";
import Message from "../components/livefeed/message";
import Navbar from "../components/layout/Navbar";
import SearchSongPopup from "../components/Popups/SearchSongPopup";

export interface ISocketTestPageProps {}

const SocketTestPage: React.FC<ISocketTestPageProps> = (props) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const { livefeedId } = useParams();
  const [songs, setSongs] = useState<any[]>([]);
  const [phase, setPhase] = useState("idle");
  const [timeToNextPhase, setTimeToNextPhase] = useState(0);
  const [song, setSong] = useState<any>({});
  const [videoTime, setVideoTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [videoKey, setVideoKey] = useState(0);
  const [selectedVote, setSelectedVote] = useState<number>(0);
  const [formattedTime, setFormattedTime] = useState("--:--");
  const [requestSongPopup, setRequestSongPopup] = useState(false);

  var countdownIntervalId: any = null;
  var timelineIntervalId: any = null;

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
      if (data.song) {
        setSong(data.song);
        setTimelineInterval(data.song);
        setVideoTime(
          Math.round(
            (new Date().getTime() - new Date(data.song.started_at).getTime()) /
              1000
          )
        );
      }
      startCountdown(
        Math.round(
          (new Date(data.nextPhaseStart).getTime() - new Date().getTime()) /
            1000
        )
      );
    };

    const handleLivefeedRequestSong = (data: any) => {
      console.log(data);
      setSongs((songs) => [...songs, data]);
      setSelectedVote(0);
    };

    const handleLivefeedRequestPhase = (data: any) => {
      console.log(data);
      setPhase("request");
      setSelectedVote(0);
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
      setSongs([]);
      setSong(data.song);
      setVideoTime(0);
      setVideoKey((prevKey) => prevKey + 1); // Update the key to force reload
      setTimelineInterval(data.song);
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

    leaveLivefeed();
    setTimeout(() => {
      joinLivefeed(Number(livefeedId));
    }, 100);

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

  useEffect(() => {
    const handleBeforeUnload = () => {
      leaveLivefeed();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const startCountdown = (seconds: number) => {
    if (countdownIntervalId) {
      clearInterval(countdownIntervalId);
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
    countdownIntervalId = newIntervalId;
  };

  const sendLivefeedMessage = () => {
    console.log("Sending livefeed message");
    socket.emit("livefeed_message", { message: message });
    setMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendLivefeedMessage();
    }
  };

  const leaveLivefeed = () => {
    console.log("Leaving livefeed");
    socket.emit("leave_livefeed");
  };

  const joinLivefeed = (livefeedId: number) => {
    console.log("Joining livefeed");
    socket.emit("join_livefeed", { livefeedId: livefeedId });
  };

  const requestSong = (song: any) => {
    console.log("Requesting song");
    setRequestSongPopup(false);
    socket.emit("livefeed_request_song", { videoId: song.videoId });
  };

  const voteSong = (requestedSongId: number) => {
    console.log("Voting song");
    socket.emit("livefeed_vote_song", { requestedSongId: requestedSongId });
  };

  const changeVote = (event: any) => {
    console.log("Changing vote");

    setSelectedVote(event.target.value);
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    console.log("Player is ready");

    event.target.playVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "195",
    width: "320",
    playerVars: {
      autoplay: 1,
      start: videoTime,
    },
  };

  const muteVideo = () => {
    const player = (document.getElementById("song") as any).contentWindow;
    if (isMuted) {
      player.postMessage('{"event":"command","func":"unMute","args":""}', "*");
    } else {
      player.postMessage('{"event":"command","func":"mute","args":""}', "*");
    }
    setIsMuted(!isMuted);
  };

  const setTimelineInterval = (song: any) => {
    if (timelineIntervalId) {
      clearInterval(timelineIntervalId);
    }
    const newInterval = setInterval(() => {
      const timeline = document.getElementById("timeline");

      const progressBar = document.getElementById("timeline-progress-bar");
      const progress = document.getElementById("timeline-progress");

      if (progressBar == null || progress == null || timeline == null) {
        return;
      }

      const progressTime =
        (new Date().getTime() - new Date(song.started_at).getTime()) / 1000;

      setFormattedTime(
        `${Math.floor(progressTime / 60)}:${Math.round(
          Math.round(progressTime) % 60
        )}`
      );

      const percentage = (progressTime / song.duration) * 100;

      progressBar.style.width = `${percentage}%`;
      progress.style.left = `${percentage}%`;

      if (progressTime >= song.duration) {
        progressBar.style.width = `0%`;
        progress.style.left = `0%`;
        clearInterval(newInterval);
      }
    }, 100);
    timelineIntervalId = newInterval;
  };

  return (
    <>
      <Navbar></Navbar>
      <SearchSongPopup
        isOpen={requestSongPopup}
        requestSong={(song) => requestSong(song)}
        closePopup={() => setRequestSongPopup(false)}
      ></SearchSongPopup>
      <div
        style={{ height: "100vh", width: "100vw" }}
        className="relative flex flex-row gap-0 pt-16 justify-between"
      >
        <div className="w-full flex flex-col justify-center">
          <div className="flex flex-col gap-4 items-start pl-10">
            <div className="bg-accent-secondary p-3 rounded-lg">
              <h1 className="mb-0">Livefeed {livefeedId}</h1>
            </div>
            <div
              className="flex flex-col-reverse gap-4 overflow-y-scroll w-full"
              style={{ height: "70vh" }}
            >
              {messages.map((message) => (
                <Message message={message} />
              ))}
            </div>
            <div className="flex flex-row gap-4 bg-bg-50 p-2 px-5 rounded-3xl border-neutral-900 border-2">
              <input
                type="text"
                value={message}
                onKeyDown={handleKeyDown}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                className="bg-transparent focus:outline-none"
              />
              <button onClick={() => sendLivefeedMessage()} className="">
                <SendHorizontal />
              </button>
            </div>
          </div>
        </div>
        <div className=" right-0 top-0 rounded-l-3xl p-5 bg-bg-50 h-full text-center flex flex-col justify-start items-center gap-5 w-full max-w-96">
          <h1>Now Playing</h1>
          <div className="m-5">
            <YouTube
              key={videoKey}
              videoId={song.videoId} // defaults -> ''
              id={"song"} // defaults -> ''
              opts={opts} // defaults -> {}
              onReady={onPlayerReady} // defaults -> noop
              className="hidden"
            />
            <div className="flex flex-row gap-5 justify-center">
              <img src={song.thumbnailUrl} alt="" className=" rounded-xl" />
              <div className="w-56 overflow-hidden text-nowrap flex flex-col justify-center">
                <h1 className="text-xl mb-0">{song.title}</h1>
                <p className="text-md text-left">{song.artist}</p>
                <div className="flex flex-row justify-between gap-5">
                  <div
                    id="timeline"
                    className="w-full h-0.5 bg-text-primary mt-5 relative"
                  >
                    <div
                      id="timeline-progress-bar"
                      className="h-1 bg-accent w-0"
                    ></div>
                    <div
                      id="timeline-progress"
                      className="h-3 w-3 rounded-full bg-accent absolute -top-1 left-0"
                    ></div>
                    <p
                      className="text-sm absolute left-0 top-2"
                      id="progressTime"
                    >
                      {formattedTime}
                    </p>
                    <p className="absolute right-0 text-sm top-2">{`${Math.floor(
                      song.duration / 60
                    )}:${Math.round(Math.round(song.duration) % 60)}`}</p>
                  </div>

                  <button onClick={muteVideo}>
                    {isMuted ? (
                      <VolumeX
                        width={30}
                        height={30}
                        className="text-text-primary"
                      />
                    ) : (
                      <Volume2
                        width={30}
                        height={30}
                        className="text-text-primary"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-1 bg-bg-dark rounded-2xl"></div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between gap-8">
              <button
                className="btn bg-primary btn-sm"
                onClick={() => setRequestSongPopup(true)}
              >
                Request
              </button>
              <h2>
                {phase} ({timeToNextPhase})
              </h2>
              <button
                onClick={() => voteSong(selectedVote)}
                type="submit"
                className="btn bg-primary btn-sm"
              >
                Vote {selectedVote}
              </button>
            </div>
            <form className="flex flex-col gap-4 max-h-96">
              {songs.map((song) => (
                <RequestedSong
                  song={song}
                  vote={(requestedSongId) => voteSong(requestedSongId)}
                  selectedVote={selectedVote}
                  onChange={(e) => changeVote(e)}
                />
              ))}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocketTestPage;
