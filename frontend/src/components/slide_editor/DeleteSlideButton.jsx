import { useNavigate, useParams } from "react-router-dom";
import { useContext, Context } from "../../context";
import useUpdateArchive from "../../useUpdateArchive";

const DeleteSlideButton = () => {
  const { id, slideNum } = useParams();
  const { getters, setters } = useContext(Context);
  const navigate = useNavigate();
  const updateArchive = useUpdateArchive();

  const isOnlyOneSlide = getters.presentations[id].slides.length === 1;
  const slideNumAsInt = parseInt(slideNum)
  const slideIndex = slideNumAsInt - 1;
  

  const handleDelete = () => {
    // create a copy of the current presentations where for slides, the slide that is to be deleted
    // is filtered out of the array
    const updatedPresentations = {
      ...getters.presentations,
      [id]: {
        ...getters.presentations[id], 
        slides: getters.presentations[id].slides.filter((_, index) => index !== slideIndex)
      }
    };

    setters.setPresentations(updatedPresentations);
    updateArchive(id, updatedPresentations);

    // determine which slide to redirect to based on which slide was deleted
    const newSlideNum = ((slideNumAsInt - 1) < 1) ? slideNumAsInt : slideNumAsInt - 1;
    navigate(`/presentations/${id}/${newSlideNum}`); 

  }
  const deleteButtonStyle = `${isOnlyOneSlide ? "opacity-30 cursor-not-allowed" : "hover:bg-zinc-300/50"}`
  const deleteButtonSvgStyle = "size-6 md:size-8 p-1";
  return (
    <button onClick={handleDelete} disabled={isOnlyOneSlide} className={deleteButtonStyle} aria-label="Delete current slide">
      <svg className={deleteButtonSvgStyle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#a1a1aa">
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    </button>
  );
}

export default DeleteSlideButton;