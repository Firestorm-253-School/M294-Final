import { Check, Cross, Pencil, UserRoundPlus, X } from "lucide-react";
import { ApiDelete, ApiPost } from "../api";
export interface IUserCardProps {
  profile: any;
  refresh: Function;
}

const UserCard: React.FC<IUserCardProps> = (props) => {
  const user = props.profile;

  const sendRequest = async (userId: number) => {
    const response = await ApiPost({}, `requests/${userId}/send`);
    if (response.status == "success") {
      console.log("Friend request sent");
    }
    props.refresh();
  };

  const acceptRequest = async (userId: number) => {
    const response = await ApiPost({}, `requests/${userId}/accept`);
    if (response.status == "success") {
      console.log("Friend request accepted");
    }
    props.refresh();
  };

  const cancelRequest = async (userId: number) => {
    const response = await ApiDelete(`requests/${userId}/cancel`);
    if (response.status == "success") {
      console.log("Friend request accepted");
    }
    props.refresh();
  };

  const removeFriend = async (userId: number) => {
    const response = await ApiDelete(`friends/${userId}`);
    if (response.status == "success") {
      console.log("Friend removed");
    }
    props.refresh();
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
            <h2 className="card-title text-2xl text-nowrap">
              {user.displayName}
            </h2>
            <span className="flex flex-row justify-start w-min gap-2 items-center">
              <p className="text-text-secondary">{user.username}</p>
              {user.isOwn ? (
                <Pencil
                  height={20}
                  className=" text-text-primary cursor-pointer hover:fill-text-primary"
                />
              ) : null}
            </span>
            <span className="flex flex-row justify-start w-min gap-2 items-center">
              <p>{user.email}</p>
              {user.isOwn ? (
                <Pencil
                  height={20}
                  className=" text-text-primary cursor-pointer hover:fill-text-primary"
                />
              ) : null}
            </span>
            <div className="flex flex-row justify-start gap-2 items-center">
              <p>Hallo das hier ist eine Test bio</p>
              {user.isOwn ? (
                <Pencil
                  height={20}
                  className=" text-text-primary cursor-pointer hover:fill-text-primary"
                  onClick={() => sendRequest(user.userId)}
                />
              ) : null}
            </div>
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
              <UserRoundPlus />
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
