import React, { useEffect, useState } from "react";
import { ApiGet, ApiPost, ApiDelete } from "../api";
import UserCard from "./UserCard";

interface User {
  profileId: number;
  displayName: string;
  email: string;
  isOwn?: boolean;
  isFriend?: boolean;
  requestOutgoing?: boolean;
}

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const [usersToAdd, setUsersToAdd] = useState<User[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const currentUserId = Number(localStorage.getItem("user_id"));

  const fetchFriends = async () => {
    const response = await ApiGet("friends");
    if (response && response.status === "success") {
      setFriends(response.response);
    } else {
      console.error("Failed to fetch friends:", response);
    }
  };

  const fetchUsersToAdd = async () => {
    const response = await ApiGet("profiles");
    if (response && response.status === "success") {
      const allUsers: User[] = response.response.map((user: any) => ({
        profileId: user.userId, // Ensure profileId is correctly mapped
        displayName: user.displayName,
        email: user.email,
        isOwn: user.isOwn,
        isFriend: user.isFriend,
        requestOutgoing: user.requestOutgoing,
      }));
      console.log("All Users:", allUsers); // Debugging log
      const nonFriends = allUsers.filter(
        (user) =>
          user.profileId !== currentUserId &&
          !friends.some((friend) => friend.profileId === user.profileId)
      );
      console.log("Non-Friends:", nonFriends); // Debugging log
      setUsersToAdd(nonFriends);
    } else {
      console.error("Failed to fetch users:", response);
    }
  };

  const fetchOutgoingRequests = async () => {
    const response = await ApiGet("requests");
    if (response && response.status === "success") {
      const outgoing = response.response.filter((request: any) => request.senderId === currentUserId);
      setOutgoingRequests(outgoing.map((request: any) => request.receiverId));
    } else {
      console.error("Failed to fetch outgoing requests:", response);
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchOutgoingRequests();
  }, []);

  useEffect(() => {
    fetchUsersToAdd();
  }, [friends]);

  const sendFriendRequest = async (userId: number) => {
    setOutgoingRequests([...outgoingRequests, userId]);
    setUsersToAdd(usersToAdd.filter((user) => user.profileId !== userId));
    const response = await ApiPost({}, `requests/${userId}/send`);
    if (response && response.status === "success") {
      console.log("Friend request sent");
    } else {
      console.error("Failed to send friend request:", response);
      // Revert state changes if the request fails
      setOutgoingRequests(outgoingRequests.filter((id) => id !== userId));
      fetchUsersToAdd();
    }
  };

  const cancelFriendRequest = async (userId: number) => {
    const response = await ApiDelete(`requests/${userId}/cancel`);
    if (response && response.status === "success") {
      console.log("Friend request canceled");
      setOutgoingRequests(outgoingRequests.filter((id) => id !== userId));
      fetchUsersToAdd();
    } else {
      console.error("Failed to cancel friend request:", response);
    }
  };

  const filteredUsersToAdd = usersToAdd.filter((user) =>
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Users to Add:", filteredUsersToAdd); // Debugging log

  return (
    <div className="p-4">
      <h2 className="text-xl text-primary spacing">Friends</h2>
      {friends.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <div key={friend.profileId} className="card w-full bg-base-100 shadow-md p-4">
              <UserCard profile={friend} refresh={fetchFriends} />
            </div>
          ))}
        </div>
      ) : (
        <p>No friends found.</p>
      )}
      <hr className="my-6" />
      <h3 className="text-lg text-primary spacing">Add User</h3>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      {filteredUsersToAdd.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsersToAdd.map((user) => (
            <div key={user.profileId} className="card w-full bg-base-100 shadow-md p-4">
              <UserCard profile={user} refresh={fetchUsersToAdd} />
              {outgoingRequests.includes(user.profileId) ? (
                <button
                  className="btn btn-secondary mt-2"
                  onClick={() => cancelFriendRequest(user.profileId)}
                >
                  Cancel Request
                </button>
              ) : (
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => sendFriendRequest(user.profileId)}
                >
                  Add Friend
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No users available to add.</p>
      )}
    </div>
  );
};

export default Friends;