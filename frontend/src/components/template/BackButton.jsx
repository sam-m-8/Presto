import { useNavigate } from "react-router-dom";

const BackButton = ({path}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(path);
  }

  const buttonStyle = "bg-transparent hover:bg-white/20 text-white py-2 px-4 rounded inline-flex gap-2 items-center";
  const arrowSvgStyle = "size-4";
  const textStyle = "hidden md:block"
  return (
    <div>
      <button className={buttonStyle} onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className={arrowSvgStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <p className={textStyle}>
          Back
        </p>
      </button>
    </div>
  )
}

export default BackButton;