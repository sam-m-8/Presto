import pagesIcon from "../../assets/pages-icon.svg";
import { Link } from "react-router-dom";


const PresentationListCard = ({ presId, thumbnail, numSlides, title, description }) => {
  const cardContainerStyle = "aspect-[2/1] rounded shadow-lg shadow-gray-200 bg-white duration-300 hover:-translate-y-1";
  const linkStyle = "block h-full w-full cursor-pointer";
  const cardHeaderStyle = "relative w-full h-4/6 bg-zinc-200 rounded-t flex items-center justify-center";
  const imgStyle = "h-full";
  const numSlidesContainerStyle = "flex items-center justify-center rounded-full bg-white px-2 py-1 absolute top-2 right-2 shadow";
  const slideIconStyle = "h-5 mx-1";
  const cardFooterStyle = "px-2 pt-0.5";
  const titleStyle = "text-lg font-bold leading-relaxed text-gray-800 overflow-hidden whitespace-nowrap text-ellipsis";
  const descriptionStyle = "leading-5 text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis";


  return (
    <>
      <div className={cardContainerStyle}>
        <Link to={`/presentations/${presId}/1`} className={linkStyle}>
          <div className={cardHeaderStyle}>
            {thumbnail && (
              <img
                className={imgStyle}
                src={thumbnail}
                alt="Thumbnail"
              />
            )}
            <figure className={numSlidesContainerStyle}>
              <img
                src={pagesIcon}
                alt="Number of slides"
                className={slideIconStyle}
              />
              <figcaption>
                {numSlides}
              </figcaption>
            </figure>
          </div>

          <div className={cardFooterStyle}>
            <h3 className={titleStyle}>
              {title}
            </h3>
            <p className={descriptionStyle}>
              {description}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default PresentationListCard;