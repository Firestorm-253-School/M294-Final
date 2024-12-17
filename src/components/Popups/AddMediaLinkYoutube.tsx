import { useState } from "react";

export interface IAddMediaLinkProps {
  isVisible: boolean;
  cancelFunction: Function;
  addLink: any;
}

const AddMediaLinkYoutube: React.FC<IAddMediaLinkProps> = (props) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const add = () => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    if (!youtubeRegex.test(url)) {
      setError("Please enter a valid YouTube link.");
      return;
    }
    console.log(url);
    props.addLink({ url: url, source: "Youtube" });
    setUrl("");
    setError("");
    props.cancelFunction();
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
                add();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube link here"
                className="input input-bordered w-full mb-4"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" className="btn btn-primary w-full mb-4">
                Add Link
              </button>
            </form>
            <button
              onClick={() => props.cancelFunction()}
              className="btn btn-danger w-full mt-4"
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
