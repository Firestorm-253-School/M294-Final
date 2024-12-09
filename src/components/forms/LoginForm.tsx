import { useState } from "react";
import { ApiPost } from "../../components/api";
import { Navigate, useNavigate } from "react-router";

export interface ILoginFormProps {}

const LoginForm: React.FC<ILoginFormProps> = (props) => {
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = async (formData: any) => {
    const response = await ApiPost(formData, "auth/login", true);

    console.log(response);
    if (response.token) {
      setIsLoggedIn(true);
      localStorage.setItem("auth_token", response.token);
      //redirect
    } else {
      setError(true);
    }
  };

  return (
    <><div className="flex flex-col items-center justify-center min-h-screen bg-base-300">
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">Login</h1>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            Username and Password combination doesn't match!
          </p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);

            const data: Record<string, any> = {};
            formData.forEach((value, key) => {
              data[key] = value;
            });

            login(data);
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="username" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Your Username"
              className="input input-bordered w-full"
              required
              onChange={() => {
                setError(false);
              }}
            />
          </div>
          <div>
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              className="input input-bordered w-full"
              required
              onChange={() => {
                setError(false);
              }}
            />
          </div>
          <button className="btn btn-primary w-full">Login</button>
        </form>
        {isLoggedIn ? <Navigate to={"/"}></Navigate> : null}
        <button
          onClick={() => navigate("/register")}
          className="btn btn-link text-primary mt-4"
        >
          Register
        </button>
      </div>
    </div>
  </div></>
  );
  
};

export default LoginForm;
