//!!!!IMPLEMENT ERROR HANDLING!!!!!
//AND SPOTIFY!!!

import { useState } from "react";
import { ApiPost } from "../api";
import AddMediaLinkYoutube from "./AddMediaLinkYoutube";
import AddMediaLinkSpotify from "./AddMediaLinkSpotify";
import { useNavigate } from "react-router";

export interface ICreatePostPopupProps {
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
        <div style={{ position: "absolute", top: "0px" }}>
          <h1>Create Post</h1>
          <textarea
            name="content"
            id="content"
            placeholder="write something"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <button
            onClick={() => {
              setMediaPopupVisible(0);
            }}
          >
            Add YouTube
          </button>
          <button
            onClick={() => {
              setMediaPopupVisible(1);
            }}
          >
            Add Spotify
          </button>
          <AddMediaLinkYoutube
            isVisible={mediaPopupVisible == 0 ? true : false}
            cancelFunction={() => cancel()}
            addLink={(link: any) => addYoutubeLink(link)}
          ></AddMediaLinkYoutube>
          <AddMediaLinkSpotify
            isVisible={mediaPopupVisible == 1 ? true : false}
            cancelFunction={() => cancel()}
            addLink={(link: any) => addSpotifyLink(link)}
          ></AddMediaLinkSpotify>
          <div>
            {youtubeLinks?.map((link) => (
              <div>
                <h4 className="link">
                  {link.source}: {link.url}
                </h4>
              </div>
            ))}
          </div>
          <div>
            {spotifyLinks?.map((link) => (
              <h4 className="link">
                {link.source}: {link.url}
              </h4>
            ))}
          </div>
          <button
            onClick={() => {
              createPost(youtubeLinks?.concat(spotifyLinks), content);
              navigate("/");
            }}
          >
            Post
          </button>
        </div>
      ) : null}
    </>
  );
};

export default CreatePostPopup;
