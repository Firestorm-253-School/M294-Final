import React from "react";
import { UserPlus } from "lucide-react";
import { ApiPost, ApiDelete } from "../api";

interface UserCardActionsProps {
  userId: number;
  isFriend: boolean;
  requestOutgoing: boolean;
  refresh: () => void;
}

const UserCardActions: React.FC<UserCardActionsProps> = ({ userId, isFriend, requestOutgoing, refresh }) => {
  const sendRequest = async () => {
    await ApiPost({}, `requests/${userId}/send`);
    refresh();
  };

  const cancelRequest = async () => {
    await ApiDelete(`requests/${userId}/cancel`);
    refresh();
  };

  if (isFriend) {
    return null;
  }

  return (
    <div>
      {!requestOutgoing ? (
        <button className="btn btn-sm btn-primary mt-2" onClick={sendRequest}>
          <UserPlus size={16} /> Add
        </button>
      ) : (
        <button className="btn btn-sm btn-secondary mt-2" onClick={cancelRequest}>
          Cancel Request
        </button>
      )}
    </div>
  );
};

export default UserCardActions;