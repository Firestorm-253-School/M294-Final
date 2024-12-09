import { useState } from "react";
import { ApiPost } from "../api";
import { useNavigate } from "react-router";

export interface IRegisterFormProps {}

const RegisterForm: React.FC<IRegisterFormProps> = (props) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const register = async (formData: any) => {
    const response = await ApiPost(formData, "auth/register", true);
    if (response.user) {
      console.log(response.user);
      //redirect
      navigate("/login");
    } else {
      console.log(response);
      setError("Could Not Create User");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-300">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-primary mb-4 text-center">
            Register
          </h1>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
  
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
  
              console.log(formData);
  
              const password = formData.get("password");
              const confirm_password = formData.get("confirm_password");
  
              if (password === confirm_password) {
                const data: Record<string, any> = {};
                formData.forEach((value, key) => {
                  if (key !== "confirm_password") {
                    data[key] = value;
                  }
                });
  
                register(data);
              } else {
                setError("Passwords don't match");
              }
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
              />
            </div>
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
                required
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
              />
            </div>
            <div>
              <label htmlFor="confirm_password" className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Your Password"
                className="input input-bordered w-full"
                required
              />
            </div>
            <button className="btn btn-primary w-full">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default RegisterForm;
