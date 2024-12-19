import { Plus } from "lucide-react";

export interface ISongProps {
  song: any;
  addSong: (song: any) => void;
}

const Song: React.FC<ISongProps> = (props) => {
  const song = props.song;
  return (
    <>
      <div className="flex flex-row items-center justify-between p-2 bg-bg-dark rounded-xl gap-4">
        <div className="flex flex-row items-center gap-4">
          <img
            src={song.thumbnail}
            alt=""
            height={60}
            width={60}
            className="rounded-md"
          />
          <div className="flex flex-col items-start justify-center max-w-52 w-52 text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
            <p className=" font-bold">{song.title}</p>
            <div className="flex flex-row items-center justify-between w-full">
              <p>{song.artist}</p>{" "}
              <p className="text-xs">{`${Math.floor(
                song.duration / 60
              )}min ${Math.round(Math.round(song.duration) % 60)}s`}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => props.addSong(song)}
          className="bg-neutral-50 rounded-full p-1 text-neutral-900"
        >
          <Plus></Plus>
        </button>
      </div>
    </>
  );
};

export default Song;
