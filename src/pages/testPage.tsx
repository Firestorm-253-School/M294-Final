import ReactDOM from "react-dom";
import CreatePostPopup from "../components/Popups/CreatePostPopup";
import { useState } from "react";

export interface ITestPageProps {}

const TestPage: React.FC<ITestPageProps> = (props) => {
  const [popup, setPopup] = useState(false);
  return (
    <>
      {popup ? <CreatePostPopup></CreatePostPopup> : null}
      <button
        onClick={() => {
          setPopup((popup) => !popup);
        }}
      >
        Open Popup
      </button>
    </>
  );
};

export default TestPage;
