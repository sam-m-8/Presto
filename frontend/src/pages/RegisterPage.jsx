import AuthFormHeader from "../components/auth/AuthFormHeader";
import RegisterForm from "../components/auth/RegisterForm";
import AuthBodyCard from "../components/auth/AuthBodyCard";

const RegisterPage = ({ token, handleSuccess }) => {
  const pageContainerStyle = `flex h-screen flex-col justify-center px-6 py-12 lg:px-8`;

  return (
    <>
      <div className={pageContainerStyle}>
        <AuthFormHeader>Create Account</AuthFormHeader>
        <AuthBodyCard
          FormComponent={RegisterForm}
          formProps={{ token, handleSuccess }}
          message="Already have an account?"
          linkLabel=" Log in here."
          linkPath="/login"
        />
      </div>
    </>
  );
}

export default RegisterPage;