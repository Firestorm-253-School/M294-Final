import { useState } from "react";
import { Post } from "../components/api";

export interface ILoginPageProps {}

const LoginPage: React.FC<ILoginPageProps> = (props) => {
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (formData: any) => {
    const response = await Post(formData, "auth/login", true);
    console.log(response);
    if (response.token) {
      setIsLoggedIn(true);
      localStorage.setItem("auth_token", response.token);
    } else {
      setError(true);
    }
  };

  return (
    <>
      {error ? <p>Error</p> : null}
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
      >
        <label htmlFor="username">Username</label>
        <input
          type="name"
          name="username"
          id="username"
          placeholder="Your Username"
        />
        <label htmlFor="password">Passwort</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Your Password"
        />
        <button>Login</button>
      </form>
      {isLoggedIn ? <p>Success</p> : null}
    </>
  );
};

export default LoginPage;
