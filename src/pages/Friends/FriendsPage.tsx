import React from "react";
import Friends from "../../components/Friends/Friends";

const FriendsPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl text-primary spacing">Friends Page</h1>
      <Friends />
    </div>
  );
};

export default FriendsPage;