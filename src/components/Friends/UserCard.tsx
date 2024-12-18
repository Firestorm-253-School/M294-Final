import { useState } from "react";
import { Pencil } from "lucide-react";
import UserCardActions from "./UserCardActions";

export interface IUserCardProps {
  profile: any;
  refresh: () => void;
}

const UserCard: React.FC<IUserCardProps> = ({ profile, refresh }) => {
  const user = profile;

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user.displayName);

  const handleEditName = () => {
    setIsEditingName(true);
    setEditedName(user.displayName);
  };

  const saveProfile = async () => {
    // Implement profile saving logic here
  };

  return (
    <div className="user-card bg-gray-800 shadow-lg rounded-xl p-4 flex items-center gap-4 max-w-md">
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600">
        <img
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt="User Avatar"
          className="object-cover w-full h-full"
        />
      </div>

      {/* User Info */}
      <div className="flex-1">
        {/* Name */}
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="text-white bg-gray-700 rounded p-1 text-lg w-full focus:outline-none"
            />
          ) : (
            <h2 className="text-lg text-white font-semibold">{user.displayName}</h2>
          )}
          {user.isOwn && (
            <Pencil
              size={16}
              className="text-gray-400 cursor-pointer hover:text-gray-200"
              onClick={() => setIsEditingName(true)}
            />
          )}
        </div>

        {/* Email */}
        <p className="text-sm text-gray-400">{user.email}</p>

        {/* Action Buttons */}
        <UserCardActions
          userId={user.profileId}
          isFriend={user.isFriend}
          requestOutgoing={user.requestOutgoing}
          refresh={refresh}
        />
      </div>
    </div>
  );
};

export default UserCard;
