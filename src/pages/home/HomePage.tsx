import PostsContainer from "../../components/home/PostsContainer";


export interface IHomePageProps {}

const HomePage: React.FC<IHomePageProps> = (props) => {
	return (
		<>
            <PostsContainer/>
		</>
	);
};

export default HomePage;
