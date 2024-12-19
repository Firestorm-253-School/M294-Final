import { useEffect, useState } from "react";

export interface IRequestedSongProps {
  song: any;
  vote: (requestedSongId: number) => void;
  selectedVote: number;
  onChange: (e: any) => void;
  voteCount: any[];
}

const RequestedSong: React.FC<IRequestedSongProps> = (props) => {
  const song = props.song;
  const [voteCount, setVoteCount] = useState(0);
  useEffect(() => {
    if (props.voteCount.length <= 0) return;
    props.voteCount.forEach((element) => {
      console.log(element);
      if (element.requestedSongId == song.requestedSongId) {
        setVoteCount(element.voteCount);
      }
    });
  }, [props.voteCount]);

  return (
    <>
      <div className="flex flex-row items-center justify-between p-2 bg-bg-200 rounded-xl gap-4">
        <img
          src={song.thumbnailUrl}
          alt=""
          height={60}
          width={60}
          className="rounded-md"
        />
        <div className="flex flex-col items-start justify-center max-w-36 text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
          <p className=" font-bold">{song.title}</p>
          <div className="flex flex-row items-center justify-between w-full">
            <p>{song.artist}</p>{" "}
            <p className="text-xs">{`${Math.floor(
              song.duration / 60
            )}min ${Math.round(Math.round(song.duration) % 60)}s`}</p>
          </div>
        </div>
        <p>{voteCount} Votes</p>
        {/* <button
          className="btn btn-sm"
          onClick={() => props.vote(song.requestedSongId)}
        >
          Vote
        </button> */}
        <input
          type="radio"
          name="vote"
          id="vote"
          className="w-5 h-5"
          value={song.requestedSongId}
          checked={props.selectedVote == song.requestedSongId}
          onChange={props.onChange}
        />
      </div>
    </>
  );
};

export default RequestedSong;
