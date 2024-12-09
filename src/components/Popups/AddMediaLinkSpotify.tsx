import { useState } from "react";
import { ApiGet } from "../api";

export interface IAddMediaLinkProps {
  isVisible: boolean;
  cancelFunction: Function;
  addLink: any;
}

const AddMediaLinkSpotify: React.FC<IAddMediaLinkProps> = (props) => {
  const [searchResults, setSearchResults] = useState([]);

  const add = (url: any) => {
    console.log(url);
    props.addLink({ url: url, source: "Spotify" });
    setSearchResults([]);
    props.cancelFunction();
  };

  const fetchSpotify = async (formData: any) => {
    const response = await ApiGet(`spotify?q=${formData.query}`);
    console.log(response);
    setSearchResults(response.song.tracks.items);
  };

  return (
    <>
      {props.isVisible ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);

              const data: Record<string, any> = {};
              formData.forEach((value, key) => {
                data[key] = value;
              });

              fetchSpotify(data);
            }}
          >
            <input type="text" name="query" id="query" placeholder="Search" />
            <button>Search</button>
            {searchResults?.map((result: any) => (
              <>
                <h4>{result.name}</h4>
                <button onClick={() => add(result.external_urls.spotify)}>
                  Add
                </button>
              </>
            ))}
            <button
              type="reset"
              onClick={() => {
                setSearchResults([]);
                props.cancelFunction();
              }}
            >
              Cancel
            </button>
          </form>
        </>
      ) : null}
    </>
  );
};

export default AddMediaLinkSpotify;
