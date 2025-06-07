import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const PreviousSlideButton = ({ isPresentMode = false }) => {
  const { id, slideNum } = useParams();
  const navigate = useNavigate();
  
  // get previous slide in the presentation
  const prevSlideNum = (parseInt(slideNum) - 1).toString();
  const isFirstSlide = prevSlideNum < 1;

  // determine the path depending on if we're in present or edit mode
  const navPath = `/presentations/${id}/${prevSlideNum}${isPresentMode ? "/present" : ""}`;

  const handlePreviousSlide = () => {
    if (!isFirstSlide) {
      navigate(navPath);
    }
  }

  // handle user's clicking the left arrow on their keyboard to go to the previous slide
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handlePreviousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFirstSlide, navigate, id, prevSlideNum]);

  const arrowSvgStyle = `size-10 rounded-lg p-1 ${isFirstSlide ? "opacity-20 cursor-not-allowed" : "hover:bg-zinc-300/50"} `; 

  return (
    <button onClick={handlePreviousSlide} disabled={isFirstSlide} aria-label="Move to previous slide">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#a1a1aa" className={arrowSvgStyle}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </button>
  );
}

export default PreviousSlideButton;
