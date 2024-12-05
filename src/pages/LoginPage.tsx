export interface ILoginPageProps {}

const LoginPage: React.FC<ILoginPageProps> = (props) => {
  return (
    <>
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="name"
          name="password"
          id="password"
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
    </>
  );
};

export default LoginPage;
