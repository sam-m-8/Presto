import { Context, useContext } from "../../context";
import { useParams } from "react-router-dom";
import useUpdateArchive from "../../useUpdateArchive";

const DuplicateComponentButton = ({ componentIndex }) => {
  const buttonStyling = "group flex w-full items-center justify-center gap-2 rounded-lg py-1.5 px-3 hover:bg-indigo-200/20 text-indigo-600";

  const { getters, setters } = useContext(Context);
  const { id, slideNum } = useParams();
  const slideIndex = slideNum - 1;
  const updateArchive = useUpdateArchive();

  const handleClick = (e) => {
    e.preventDefault();

    // create a copy of the component that is being duplicated and create a new id for it
    const targetComponent = {...getters.presentations[id].slides[slideIndex].components[componentIndex]};
    const newComponentId = Date.now().toString();
    
    const focusSlide = getters.presentations[id].slides[slideIndex];

    // Add new component to the current slide's components
    const updatedSlide = {
      ...focusSlide,
      components: {
        ...focusSlide.components,
        [newComponentId]: targetComponent,
      },
    };

    const updatedSlides = [...getters.presentations[id].slides];
    updatedSlides[slideIndex] = updatedSlide;

    // Update the current presentation with its updated slides
    const updatedPresentations = {
      ...getters.presentations,
      [id]: {
        ...getters.presentations[id],
        slides: updatedSlides,
      },
    };

    setters.setPresentations(updatedPresentations);
    updateArchive(id, updatedPresentations);
  }

  return (
    <button
      className={buttonStyling}
      onClick={handleClick}
    >
      Duplicate
    </button>
  );
}

export default DuplicateComponentButton;