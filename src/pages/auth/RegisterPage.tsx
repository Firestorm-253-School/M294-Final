import RegisterForm from "../../components/forms/RegisterForm";

export interface IRegisterPageProps {}

const RegisterPage: React.FC<IRegisterPageProps> = (props) => {
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
