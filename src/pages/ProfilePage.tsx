import { useParams } from "react-router";
import UserPostContainer from "../components/profile/UserPostContainer";

export interface IProfilePageProps {}

const ProfilePage: React.FC<IProfilePageProps> = (props) => {
  const { userId } = useParams();

  return (
    <>
      <UserPostContainer userId={Number(userId)} />
    </>
  );
};

export default ProfilePage;
