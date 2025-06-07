const LoginButton = ({onClick}) => {

  const buttonStyle = "bg-transparent text-white font-bold rounded py-2 px-7 transform transition duration-300 ease-in-out hover:bg-zinc-50/20";

  return (
    <button 
      className={buttonStyle}
      onClick={onClick}>
      Log in
    </button>
  );
}

export default LoginButton;