import LoginForm from "./LoginForm";

const LoginCard = () => {
  const loginCardStyle = "mt-10 sm:mx-auto sm:w-full sm:max-w-sm";
  const textStyle = "mt-10 text-center text-sm/6 text-gray-500"
  const linkStyle = "font-semibold text-indigo-600 hover:text-indigo-500";

  return (
    <div className={loginCardStyle}>
      <LoginForm />
      <p className={textStyle}>
          Don&apos;t have an account?
        <a href="#" className={linkStyle}> Sign up here</a>
      </p>
    </div>
  )
}

export default LoginCard;