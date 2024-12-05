import { ReactNode } from "react";
import { useNavigate } from "react-router";

export interface IProtectedRouteProps {
  redirectPath: string;
  children: ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = (props) => {
  const navigate = useNavigate();
  if (localStorage.getItem("auth_token")) {
    return <>{props.children}</>;
  } else {
    navigate(props.redirectPath);
  }
};

export default ProtectedRoute;
