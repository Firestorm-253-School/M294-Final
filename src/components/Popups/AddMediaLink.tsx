import { useState } from "react";
import { ApiGet } from "../api";

export interface IAddMediaLinkProps {
  isVisible: boolean;
  cancelFunction: Function;
  addLink: any;
  source: String;
}

const AddMediaLink: React.FC<IAddMediaLinkProps> = (props) => {
  const [searchResults, setSearchResults] = useState([]);

  const add = (url: any) => {
    console.log(url);
    props.addLink({ url: url, source: props.source });
    props.cancelFunction();
  };

  const fetchYoutube = async (formData: any) => {
    const response = await ApiGet(`videos?q=${formData.query}`);
    console.log(response);
    setSearchResults(response.videos);
  };

  const fetchSpotify = async (formData: any) => {
    const response = await ApiGet(`videos?q=${formData.query}`);
    console.log(response);
    setSearchResults(response.videos);
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

              fetchYoutube(data);
            }}
          >
            <input type="text" name="query" id="query" placeholder="Search" />
            <button>Search</button>
            {searchResults?.map((result: any) => (
              <>
                <h4>{result.title}</h4>
                <button
                  onClick={() =>
                    add(`https://youtube.com/watch?v=${result.videoId}`)
                  }
                >
                  Add
                </button>
              </>
            ))}
            <button type="reset" onClick={() => props.cancelFunction()}>
              Cancel
            </button>
          </form>
        </>
      ) : null}
    </>
  );
};

export default AddMediaLink;
