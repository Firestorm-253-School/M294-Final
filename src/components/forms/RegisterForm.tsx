import { Post } from "../api";

export interface IRegisterFormProps {}

const RegisterForm: React.FC<IRegisterFormProps> = (props) => {
  const register = async (formData: any) => {
    const response = await Post(formData, "auth/register", true);
    if (response.user) {
      console.log(response.user);
    } else {
      console.log(response);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);

          const data: Record<string, any> = {};
          formData.forEach((value, key) => {
            if (key != "confirm_password") {
              data[key] = value;
            }
          });

          register(data);
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
