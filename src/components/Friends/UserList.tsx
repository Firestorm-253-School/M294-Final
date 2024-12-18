import React from "react";
import UserCard from "./UserCard";

interface User {
  profileId: number;
  displayName: string;
  email: string;
  isOwn?: boolean;
  isFriend?: boolean;
  requestOutgoing?: boolean;
}

interface UserListProps {
  users: User[];
  refresh: () => void;
}

const UserList: React.FC<UserListProps> = ({ users, refresh }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <div key={user.profileId} className="card w-full bg-base-100 shadow-md p-4">
          <UserCard profile={user} refresh={refresh} showAddButton={false} />
        </div>
      ))}
    </div>
  );
};

export default UserList;