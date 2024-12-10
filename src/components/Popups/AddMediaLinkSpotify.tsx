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
      {props.isVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="card w-96 bg-base-100 shadow-lg rounded-xl p-6">
            <h3 className="text-2xl font-bold text-center mb-4">
              Add Spotify Link
            </h3>
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
              className="space-y-4"
            >
              <input
                type="text"
                name="query"
                id="query"
                placeholder="Search for a Spotify track..."
                className="input input-bordered input-primary w-full"
                required
              />
              <button type="submit" className="btn btn-primary w-full">
                Search
              </button>
            </form>

            <div className="max-h-64 overflow-y-auto mt-4 space-y-2">
              {searchResults?.map((result: any) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-2  rounded-md shadow-sm"
                >
                  <h4 className="text-sm font-medium">{result.name}</h4>
                  <button
                    onClick={() => {
                      add(result.external_urls.spotify);
                    }}
                    className="btn btn-success btn-sm"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setSearchResults([]);
                props.cancelFunction();
              }}
              className="btn btn-outline btn-error w-full mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddMediaLinkSpotify;
