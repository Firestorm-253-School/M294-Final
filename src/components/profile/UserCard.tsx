import { useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import { ApiDelete, ApiPost, ApiPut } from "../api";

export interface IUserCardProps {
  profile: any;
  refresh: () => void;
}

const UserCard: React.FC<IUserCardProps> = ({ profile, refresh }) => {
  const user = profile;

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const [editedName, setEditedName] = useState(user.displayName);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedBio, setEditedBio] = useState(user.bio);

  const sendRequest = async (userId: number) => {
    const response = await ApiPost({}, `requests/${userId}/send`);
    if (response.status === "success") {
      console.log("Friend request sent");
    }
    refresh();
  };

  const acceptRequest = async (userId: number) => {
    const response = await ApiPost({}, `requests/${userId}/accept`);
    if (response.status === "success") {
      console.log("Friend request accepted");
    }
    refresh();
  };

  const cancelRequest = async (userId: number) => {
    const response = await ApiDelete(`requests/${userId}/cancel`);
    if (response.status === "success") {
      console.log("Friend request canceled");
    }
    refresh();
  };

  const saveProfile = async () => {
    const updatedProfile = {
      displayName: editedName || user.displayName,
      email: editedEmail || user.email,
    };
    const response = await ApiPut(updatedProfile, `profiles`);
    if (response.status === "success") {
      console.log("Profile updated successfully");
      refresh();
    } else {
      console.error("Failed to update profile", response);
    }
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingBio(false);
  };

  // Update editedName when editing starts
  const handleEditName = () => {
    setEditedName(user.displayName);
    setIsEditingName(true);
  };

  // Update editedEmail when editing starts
  const handleEditEmail = () => {
    setEditedEmail(user.email);
    setIsEditingEmail(true);
  };

  return (
    <>
      <div className="card w-max shadow-xl bg-bg-50">
        <div className="card-body flex flex-row items-center gap-5">
          <div className="avatar">
            <div className="w-36 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {/* Name Section */}
            <div className="flex flex-row justify-start w-min gap-2 items-center">
              {isEditingName ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="input input-bordered"
                />
              ) : (
                <h2 className="card-title text-2xl text-nowrap">
                  {user.displayName}
                </h2>
              )}
              {user.isOwn && (
                <Pencil
                  height={20}
                  className="text-text-primary cursor-pointer hover:fill-text-primary"
                  onClick={isEditingName ? saveProfile : handleEditName}
                />
              )}
            </div>
            {/* Email Section */}
            <div className="flex flex-row justify-start w-min gap-2 items-center">
              {isEditingEmail ? (
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="input input-bordered"
                />
              ) : (
                <p>{user.email}</p>
              )}
              {user.isOwn && (
                <Pencil
                  height={20}
                  className="text-text-primary cursor-pointer hover:fill-text-primary"
                  onClick={isEditingEmail ? saveProfile : handleEditEmail}
                />
              )}
            </div>
            {/* Bio Section */}
            <div className="flex flex-row justify-start gap-2 items-center">
              {isEditingBio ? (
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  className="textarea textarea-bordered"
                />
              ) : (
                <p>{user.bio}</p>
              )}
              {user.isOwn && (
                <Pencil
                  height={20}
                  className="text-text-primary cursor-pointer hover:fill-text-primary"
                  onClick={() => setIsEditingBio(!isEditingBio)}
                />
              )}
            </div>
            {/* Save Button */}
            {(isEditingName || isEditingEmail || isEditingBio) && (
              <button className="btn btn-primary mt-2" onClick={saveProfile}>
                Save
              </button>
            )}
          </div>
          {!user.isOwn && user.requestOutgoing ? (
            <div className="flex flex-col gap-2 self-end items-center">
              <span className="flex flex-row gap-2 items-center">
                <Check
                  height={20}
                  className=" text-text-primary cursor-pointe"
                />
                Request Sent
              </span>
              <button
                className="btn btn-sm bg-error text-neutral-950 hover:text-neutral-50 hover:bg-bg self-end "
                onClick={() => cancelRequest(user.userId)}
              >
                Cancel
              </button>
            </div>
          ) : !user.isOwn && user.requestIncoming ? (
            <>
              <button
                className="btn btn-sm bg-success text-neutral-950 hover:bg-bg self-end hover:text-neutral-50 "
                onClick={() => acceptRequest(user.userId)}
              >
                <Check
                  height={20}
                  className=" cursor-pointer hover:fill-text-primary"
                />
                Accept
              </button>
              <button
                className="btn btn-sm bg-error text-text-primary hover:bg-bg self-end "
                onClick={() => cancelRequest(user.userId)}
              >
                <X
                  height={20}
                  className=" cursor-pointer hover:fill-text-primary"
                />
                Reject
              </button>
            </>
          ) : !user.isOwn && !user.isFriend ? (
            <button
              className="btn bg-primary hover:bg-bg self-end "
              onClick={() => sendRequest(user.userId)}
            >
              Add
            </button>
          ) : !user.isOwn && user.isFriend ? (
            <span>
              <Check height={20} className=" text-text-primary" />
              Friend Added
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UserCard;
