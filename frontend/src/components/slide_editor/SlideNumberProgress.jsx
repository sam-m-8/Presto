import { useContext } from "react";
import { Context } from "../../context";
import { useParams } from "react-router-dom";

const SlideNumberProgress = () => {
  const { getters } = useContext(Context);
  const { id, slideNum } = useParams();

  const totalSlides = getters.presentations[id].slides.length;
  const currentSlide = slideNum;
  const slideProgressStr = `${currentSlide}/${totalSlides}`;

  const containerStyle = "text-xs md:text-base flex items-center text-zinc-500";
  return (
    <div className={containerStyle}>
      <p>
        {slideProgressStr}
      </p>
    </div>
  )
}

export default SlideNumberProgress;