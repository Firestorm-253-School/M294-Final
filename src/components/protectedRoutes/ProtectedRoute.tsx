import { ReactNode } from "react";
import { Navigate } from "react-router";

export interface IProtectedRouteProps {
  redirectPath: string;
  children: ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = (props) => {
  return (
    <>
      {localStorage.getItem("auth_token") ? (
        props.children
      ) : (
        <Navigate to={props.redirectPath}></Navigate>
      )}
    </>
  );
};

export default ProtectedRoute;
