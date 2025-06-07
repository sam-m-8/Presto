import { useNavigate } from "react-router-dom";
import RegisterButton from "../auth/RegisterButton"

const LandingInfoCard = () => {
  const navigate = useNavigate();
  const landingInfoCardStyle = "mt-10 sm:mt-0 px-5 py-5 flex-1 flex flex-col sm:items-center sm:text-center justify-center lg:items-start lg:text-start";
  const headerContainerStyle = "mb-7";
  const headerStyle = "text-white text-5xl sm:text-6xl font-bold mb-5";
  const subheadingStyle = "text-white text-xl";
  const startPresentingTextStyle = "flex inline-flex items-center justify-center gap-3";

  const StartPresentingElement = (
    <div className={startPresentingTextStyle}>
      <p>Start presenting</p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  );

  return (
    <div className={landingInfoCardStyle}>
      <div className={headerContainerStyle}>
        <h1 className={headerStyle}>
          Bring your presentations to life
        </h1>
        <p className={subheadingStyle}>
          Create slide decks that elevate your presentations using intuitive design tools
        </p>
      </div>
      <RegisterButton
        text={StartPresentingElement}
        onClick={() => navigate("/register")}
        animation="transition-transform transform hover:-translate-y-1"
      />
    </div>
  )
}

export default LandingInfoCard;