import { useState } from "react";
import CreatePostPopup from "../Popups/CreatePostPopup";
import { logout } from "../forms/logout";
import { useNavigate } from "react-router";

export interface INavbarProps {}

const Navbar: React.FC<INavbarProps> = (props) => {
  const [createPostPopup, setcreatePostPopup] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <CreatePostPopup isOpen={createPostPopup}></CreatePostPopup>
      <nav
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "50px",
        }}
      >
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

        <nav
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <button onClick={() => window.location.reload()}>Refresh</button>
          <button
            onClick={() => {
              setcreatePostPopup((popup) => !popup);
            }}
          >
            Create Post
          </button>
          <div>
            <p>*Profilbild*</p>
            <p>Profile</p>
            <a
              onClick={() => {
                if (logout()) {
                  navigate("/login");
                }
              }}
            >
              Logout
            </a>
            {}
          </div>
        </nav>
      </nav>
    </>
  );
};

export default Navbar;
