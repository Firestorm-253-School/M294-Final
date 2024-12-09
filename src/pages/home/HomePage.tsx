import PostsContainer from "../../components/home/PostsContainer";
import Navbar from "../../components/layout/Navbar";

export interface IHomePageProps {}

const HomePage: React.FC<IHomePageProps> = (props) => {
  return (
    <>
      <Navbar></Navbar>
      <div className="container-center min-h-screen py-8">
        <PostsContainer />
      </div>
    </>
  );
};

export default HomePage;
