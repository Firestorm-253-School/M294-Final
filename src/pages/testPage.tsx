import Navbar from "../components/layout/Navbar";
import CreatePostPopup from "../components/Popups/CreatePostPopup";
import { useState } from "react";

export interface ITestPageProps {}

const TestPage: React.FC<ITestPageProps> = (props) => {
  return (
    <>
      <Navbar></Navbar>
    </>
  );
};

export default TestPage;
