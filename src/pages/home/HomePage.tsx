import PostsContainer from "../../components/home/PostsContainer";

export interface IHomePageProps {}

const HomePage: React.FC<IHomePageProps> = (props) => {
  return (
    <div className="container-center min-h-screen py-8">
      <PostsContainer />
    </div>
  );
  
};

export default HomePage;
