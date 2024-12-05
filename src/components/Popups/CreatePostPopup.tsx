import { useState } from "react";
import AddMediaLink from "./AddMediaLink";

export interface ICreatePostPopupProps {
  isOpen: boolean;
}

const CreatePostPopup: React.FC<ICreatePostPopupProps> = (props) => {
  const [mediaPopupVisible, setMediaPopupVisible] = useState(false);

  const cancel = () => {
    setMediaPopupVisible(false);
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
          ></textarea>
          <button onClick={() => setMediaPopupVisible(true)}>
            Add YouTube
          </button>
          <button>Add Spotify</button>
          <AddMediaLink
            isVisible={mediaPopupVisible}
            cancelFunction={() => cancel()}
          ></AddMediaLink>
        </div>
      ) : null}
    </>
  );
};

export default CreatePostPopup;
