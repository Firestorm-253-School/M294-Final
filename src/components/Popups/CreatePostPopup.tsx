//!!!!IMPLEMENT ERROR HANDLING!!!!!

import { useState } from "react";
import { ApiPost } from "../api";
import AddMediaLinkYoutube from "./AddMediaLinkYoutube";
import AddMediaLinkSpotify from "./AddMediaLinkSpotify";
import { useNavigate } from "react-router";

export interface ICreatePostPopupProps {
  closeFunktion: Function;
  isOpen: boolean;
}

const CreatePostPopup: React.FC<ICreatePostPopupProps> = (props) => {
  const [mediaPopupVisible, setMediaPopupVisible] = useState(-1);
  const [youtubeLinks, setYoutubeLinks] = useState<any[]>();
  const [spotifyLinks, setSpotifyLinks] = useState<any[]>();
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const cancel = () => {
    setMediaPopupVisible(-1);
  };

  const createPost = async (links: any, content: any) => {
    if (links == undefined) {
      links = [];
    }
    const postObject = { content: content, mediaLinks: links };
    console.log(postObject);
    const response = await ApiPost(postObject, "posts");
    window.location.reload();
    navigate("/");
    if (response.id) {
      console.log(response.id);
    }
  };

  const addYoutubeLink = (link: string) => {
    console.log(link);
    setYoutubeLinks((prevLinks) => {
      if (prevLinks) {
        return [...prevLinks, link];
      } else {
        return [link];
      }
    });
  };
  const addSpotifyLink = (link: string) => {
    console.log(link);
    setSpotifyLinks((prevLinks) => {
      if (prevLinks) {
        return [...prevLinks, link];
      } else {
        return [link];
      }
    });
  };

  return (
    <>
      {props.isOpen ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="card w-96 bg-base-100 shadow-xl p-6">
            <h1 className="text-2xl font-semibold text-gray-400 mb-4">
              Create Post
            </h1>

            <textarea
              name="content"
              id="content"
              placeholder="Write something..."
              className="textarea textarea-bordered w-full h-32 mb-4 p-2"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>

            <div className="space-x-2 mb-4">
              <button
                onClick={() => {
                  setMediaPopupVisible(0);
                }}
                className="btn btn-outline btn-info"
              >
                Add YouTube
              </button>
              <button
                onClick={() => {
                  setMediaPopupVisible(1);
                }}
                className="btn btn-outline btn-success"
              >
                Add Spotify
              </button>
            </div>

            <AddMediaLinkYoutube
              isVisible={mediaPopupVisible === 0}
              cancelFunction={() => cancel()}
              addLink={(link: any) => addYoutubeLink(link)}
            />

            <AddMediaLinkSpotify
              isVisible={mediaPopupVisible === 1}
              cancelFunction={() => cancel()}
              addLink={(link: any) => addSpotifyLink(link)}
            />

            <div className="space-y-2 mb-4">
              {youtubeLinks?.map((link, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                >
                  <h4 className="text-gray-800">
                    {link.source}: {link.url}
                  </h4>
                  <button
                    type="button"
                    onClick={() => console.log("Coming soon")}
                    className="btn btn-sm btn-error"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {spotifyLinks?.map((link, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                >
                  <h4 className="text-gray-800">
                    {link.source}: {link.url}
                  </h4>
                  <button
                    type="button"
                    onClick={() => console.log("coming soon")}
                    className="btn btn-sm btn-error"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => props.closeFunktion()}
                className="btn btn-ghost text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log(youtubeLinks, spotifyLinks);

                  createPost(
                    (youtubeLinks ?? []).concat(spotifyLinks ?? []),
                    content
                  );
                }}
                className="btn btn-primary"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CreatePostPopup;
