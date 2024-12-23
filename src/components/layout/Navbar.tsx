import { useEffect, useState } from "react";
import CreatePostPopup from "../Popups/CreatePostPopup";
import CreateFeedPopup from "../Popups/CreateFeedPopup";
import { logout } from "../forms/logout";
import { useNavigate } from "react-router";

export interface INavbarProps { }

const Navbar: React.FC<INavbarProps> = (props) => {
  const [createPostPopup, setcreatePostPopup] = useState(false);
  const [createFeedPopup, setCreateFeedPopup] = useState(false);
  const [currentUserId, setcurrentUserId] = useState(0);
  const navigate = useNavigate();
  useEffect(() => { setcurrentUserId(Number(localStorage.getItem("user_id"))); }, [])
  return (
    <>
      <CreatePostPopup
        closeFunktion={() => setcreatePostPopup(false)}
        isOpen={createPostPopup}
      ></CreatePostPopup>
      <CreateFeedPopup
        closeFunktion={() => setCreateFeedPopup(false)}
        isOpen={createFeedPopup}
      ></CreateFeedPopup>

      <div className="navbar bg-base-100 w-full fixed z-10 shadow-lg">
        <div className="navbar-start">
          <a onClick={() => navigate("/")} className="btn btn-ghost text-xl">
            X Clone
          </a>
        </div>
        <div className="form-control navbar-center">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>

        <div className="gap-8 navbar-end">
          <a
            onClick={() => {
              setcreatePostPopup((popup) => !popup);
            }}
            className="btn btn-primary btn-outline"
          >
            Create Post
          </a>
          <a
            onClick={() => setCreateFeedPopup((popup) => !popup)}
            className="btn btn-secondary btn-outline"
          >
            Create Feed
          </a>
          <a
            className="btn btn-secondary btn-outline btn-ghost"
            onClick={() => window.location.reload()}
          >
            Refresh
          </a>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-max p-2 shadow"
            >
              <li>
                <a
                  onClick={() => navigate(`/profile/${currentUserId}`)}
                  className="justify-between"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate(`/LiveFeed`)}
                  className="justify-between"
                >
                  LiveFeeds
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/friends")}
                  className="justify-between"
                >
                  Friends
                </a>
              </li>
              <li>
                <a
                  className="hover:text-red-600"
                  onClick={() => {
                    if (logout()) {
                      navigate("/login");
                    }
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
