import { useState } from "react";
import { Post } from "../api";
import { useNavigate } from "react-router";

export interface IRegisterFormProps {}

const RegisterForm: React.FC<IRegisterFormProps> = (props) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const register = async (formData: any) => {
    const response = await Post(formData, "auth/register", true);
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
    <>
      <h1>Register</h1>
      {error == "" ? null : <p>{error}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);

          console.log(formData);

          const password = formData.get("password");
          const confirm_password = formData.get("confirm_password");

          if (password == confirm_password) {
            const data: Record<string, any> = {};
            formData.forEach((value, key) => {
              if (key != "confirm_password") {
                data[key] = value;
              }
            });

            register(data);
          } else {
            setError("passwords dont match");
          }
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          type="name"
          name="username"
          id="username"
          placeholder="Your Username"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
          required
        />
        <label htmlFor="password">Passwort</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Your Password"
          required
        />
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          placeholder="Confirm Your Password"
          required
        />
        <button>Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
