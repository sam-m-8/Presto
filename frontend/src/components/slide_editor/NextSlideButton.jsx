import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from '../../context';

const NextSlideButton = ({ isPresentMode = false }) => {
  const { getters } = useContext(Context);
  const { id, slideNum } = useParams();
  const navigate = useNavigate();
  
  // get next slide in the presentation
  const slides = getters.presentations[id].slides;
  const nextSlideNum = (parseInt(slideNum) + 1).toString();
  const isLastSlide = nextSlideNum > slides.length;

  // determine the path depending on if we're in present or edit mode
  const navPath = `/presentations/${id}/${nextSlideNum}${isPresentMode ? "/present" : ""}`;
  
  const handleNextSlide = () => {
    if (!isLastSlide) {
      navigate(navPath);
    }
  }

  // handle user's clicking the right arrow on their keyboard to go to the next slide
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleNextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown); // clean up the event listener
    };
  }, [isLastSlide, navigate, id, nextSlideNum]);

  const arrowSvgStyle = `size-10 rounded-lg p-1 ${isLastSlide ? "opacity-20 cursor-not-allowed" : "hover:bg-zinc-300/50"} `; 

  return (
    <button onClick={handleNextSlide} disabled={isLastSlide} aria-label="Move to next slide">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#a1a1aa" className={arrowSvgStyle}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
}

export default NextSlideButton;