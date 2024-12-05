import { useState } from "react";
import AddMediaLink from "./AddMediaLink";
import { Post } from "../api";

export interface ICreatePostPopupProps {
  isOpen: boolean;
}

const CreatePostPopup: React.FC<ICreatePostPopupProps> = (props) => {
  const [mediaPopupVisible, setMediaPopupVisible] = useState(false);
  const [links, setLinks] = useState<any[]>();
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");

  const cancel = () => {
    setMediaPopupVisible(false);
  };

  const createPost = async (links: any, content: any) => {
    if (links == undefined) {
      links = [];
    }
    const postObject = { content: content, mediaLinks: links };
    console.log(postObject);
    const response = await Post(postObject, "posts", true);
    if (response.id) {
      console.log(response.id);
    }
  };

  const addLink = (link: string) => {
    console.log(link);
    setLinks((prevLinks) => {
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
              setMediaPopupVisible(true);
              setSource("youtube");
            }}
          >
            Add YouTube
          </button>
          <button
            onClick={() => {
              setMediaPopupVisible(true);
              setSource("spotify");
            }}
          >
            Add Spotify
          </button>
          <AddMediaLink
            isVisible={mediaPopupVisible}
            cancelFunction={() => cancel()}
            addLink={(link: any) => addLink(link)}
            source={source}
          ></AddMediaLink>
          {links?.map((link) => (
            <h4 className="link">
              {link.source}: {link.url}
            </h4>
          ))}
          <button onClick={() => createPost(links, content)}>Post</button>
        </div>
      ) : null}
    </>
  );
};

export default CreatePostPopup;
