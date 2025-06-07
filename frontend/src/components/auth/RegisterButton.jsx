const RegisterButton = ({ onClick, text, animation = ""}) => {
  const buttonStyle = "bg-white text-violet-700 font-bold rounded py-2 px-7 hover:bg-zinc-100 " + animation;

  return (
    <button 
      className={buttonStyle}
      onClick={onClick}>
      {text}
    </button>
  );
}

export default RegisterButton;