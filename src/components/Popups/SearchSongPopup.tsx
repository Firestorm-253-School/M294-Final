import { Search } from "lucide-react";
import { ApiGet } from "../api";
import { useState } from "react";
import Song from "../livefeed/Song";

export interface ISearchSongPopupProps {
  isOpen: boolean;
  requestSong: (song: any) => void;
  closePopup: () => void;
}

const SearchSongPopup: React.FC<ISearchSongPopupProps> = (props) => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);

  const handleClick = (e: any) => {
    if (e.target.id === "close-popup") {
      props.closePopup();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchSongs();
    }
  };

  const searchSongs = async () => {
    const response = await ApiGet(`songs/${query}`);
    console.log(response);
    setSongs(response);
  };

  return (
    <>
      {props.isOpen ? (
        <div
          className="h-screen w-screen bg-bg-dark bg-opacity-50 absolute top-0 left-0 z-10 "
          id="close-popup"
          onClick={(e) => handleClick(e)}
        >
          <div className="bg-bg-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-xl z-20 flex flex-col gap-4">
            <h1>Request Song</h1>
            <div className="flex flex-row gap-4 justify-between bg-bg-50 p-2 px-5 rounded-3xl border-neutral-900 border-2">
              <input
                type="text"
                value={query}
                onKeyDown={handleKeyDown}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your message"
                className="bg-transparent focus:outline-none"
              />
              <button onClick={() => searchSongs()} className="">
                <Search />
              </button>
            </div>
            <div className="max-h-96 overflow-auto flex flex-col gap-2 m-2">
              {songs.map((song) => (
                <Song song={song} addSong={props.requestSong}></Song>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SearchSongPopup;
