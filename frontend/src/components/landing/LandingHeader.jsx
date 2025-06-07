import { useNavigate } from "react-router-dom";
import LoginButton from "../auth/LoginButton";
import RegisterButton from "../auth/RegisterButton";

const LandingHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between py-4 px-6 bg-transparent">
      <h1 className="text-2xl font-bold text-gray-800 text-zinc-50">Presto</h1>
      <div className="flex gap-4">
        <LoginButton onClick={() => navigate("/login")}/>
        <RegisterButton text="Register" onClick={() => navigate("/register")}/>
      </div>
    </header>
  );
}

export default LandingHeader;