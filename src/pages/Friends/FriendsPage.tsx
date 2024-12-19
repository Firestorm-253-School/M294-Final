import React from "react";
import Friends from "../../components/Friends/Friends";
import Navbar from "../../components/layout/Navbar";

const FriendsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-3xl font-bold">Friends</h1>
        <Friends />
      </div>
    </>
  );
};

export default FriendsPage;