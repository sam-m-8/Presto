import AuthFormHeader from "../components/auth/AuthFormHeader";
import AuthBodyCard from "../components/auth/AuthBodyCard";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = ({ token, handleSuccess }) => {
  const loginPageContainerStyle = "flex h-screen flex-col justify-center px-6 py-12 lg:px-8";

  return (
    <div className={loginPageContainerStyle}>
      <AuthFormHeader>Log in to your account</AuthFormHeader>
      <AuthBodyCard
        FormComponent={LoginForm}
        formProps={{ token, handleSuccess }}
        message="Don't have an account?"
        linkLabel=" Sign up here."
        linkPath="/register"
      />
    </div>
  )
}

export default LoginPage;