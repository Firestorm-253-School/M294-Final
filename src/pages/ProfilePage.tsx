import { useParams } from "react-router";
import UserPostContainer from "../components/profile/UserPostContainer";
import { useEffect, useState } from "react";
import UserCard from "../components/profile/UserCard";
import { ApiGet } from "../components/api";
import Navbar from "../components/layout/Navbar";

export interface IProfilePageProps { }

const ProfilePage: React.FC<IProfilePageProps> = (props) => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("posts");
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await ApiGet(`profiles/${userId}`);
      if (response.status == "success") {
        const profile = response.response;
        console.log(profile);

        setProfile(profile);
      }
    };
    fetchData();
  }, []);

  const refresh = async () => {
    const response = await ApiGet(`profiles/${userId}`);
    if (response.status == "success") {
      const profile = response.response;
      console.log(profile);

      setProfile(profile);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-10 pl-24 pt-24">
        <UserCard refresh={refresh} profile={profile}></UserCard>
        <div className="px-10 flex flex-col items-center gap-10">
          <div className="join">
            <button
              className={`btn join-item bg-bg-100 ${activeTab == "posts" ? "bg-primary" : ""
                }`}
              onClick={() => setActiveTab("posts")}
            >
              Posts
            </button>
            {profile.isOwn == true ? (
              <>
                <button
                  className={`btn join-item bg-bg-100 ${activeTab == "likes" ? "bg-primary" : ""
                    }`}
                  onClick={() => setActiveTab("likes")}
                >
                  Likes
                </button>
                <button
                  className={`btn join-item bg-bg-100 ${activeTab == "saves" ? "bg-primary" : ""
                    }`}
                  onClick={() => setActiveTab("saves")}
                >
                  Saves
                </button>
              </>
            ) : null}
          </div>
          <UserPostContainer activeTab={activeTab} userId={Number(userId)} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
