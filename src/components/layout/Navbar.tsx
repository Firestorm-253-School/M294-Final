import { useState } from "react";
import CreatePostPopup from "../Popups/CreatePostPopup";

export interface INavbarProps {}

const Navbar: React.FC<INavbarProps> = (props) => {
  const [createPostPopup, setcreatePostPopup] = useState(false);
  return (
    <>
      <CreatePostPopup isOpen={createPostPopup}></CreatePostPopup>
      <nav>
        <h1>Logo</h1>
        <form>
          <input
            type="text"
            name="search_query"
            id="search_query"
            placeholder="Search..."
          />
          <button>Search</button>
        </form>

        <nav>
          <button
            onClick={() => {
              setcreatePostPopup((popup) => !popup);
            }}
          >
            Create Post
          </button>
          <div>
            <p>*Profilbild*</p>
            {}
          </div>
        </nav>
      </nav>
    </>
  );
};

export default Navbar;
