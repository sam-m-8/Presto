import { useNavigate } from "react-router-dom";
import { Context, useContext } from "../../context";

const LogoutButton = ({customStyle}) => {
  const buttonStyle = `bg-transparent ${customStyle} font-bold rounded py-2 px-5`;
  const { setters } = useContext(Context);

  const navigate = useNavigate();

  // remove the user's token from their local storage and frontend store and redirect them to the landing page
  const handleClick = () => {
    localStorage.removeItem("token");
    setters.setToken(null);
    navigate("/");
  }

  return (
    <button
      className={buttonStyle}
      onClick={handleClick}>
      Log out
    </button>
  );
}

export default LogoutButton;