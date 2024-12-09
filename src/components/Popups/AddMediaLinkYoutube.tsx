import { useState } from "react";
import { ApiGet } from "../api";

export interface IAddMediaLinkProps {
  isVisible: boolean;
  cancelFunction: Function;
  addLink: any;
}

const AddMediaLinkYoutube: React.FC<IAddMediaLinkProps> = (props) => {
  const [searchResults, setSearchResults] = useState([]);

  const add = (url: any) => {
    console.log(url);
    props.addLink({ url: url, source: "Youtube" });
    setSearchResults([]);
    props.cancelFunction();
  };

  const fetchYoutube = async (formData: any) => {
    try {
      const response = await ApiGet(`videos?q=${formData.query}`);
      setSearchResults(response.videos);
    } catch (error) {
      console.error("Error fetching YouTube videos", error);
    }
  };

  return (
    <>
      {props.isVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="card w-96 bg-base-100 shadow-lg rounded-xl p-6">
            <h3 className="text-2xl font-bold text-center mb-4">Add YouTube Link</h3>
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
              className="space-y-4"
            >
              <input
                type="text"
                name="query"
                id="query"
                placeholder="Search for a YouTube video..."
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
                  key={result.videoId}
                  className="flex items-center justify-between p-2  rounded-md shadow-sm"
                >
                  <h4 className="text-sm font-medium">{result.title}</h4>
                  <button
                    onClick={() =>
                      add(`https://youtube.com/watch?v=${result.videoId}`)
                    }
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

export default AddMediaLinkYoutube;
