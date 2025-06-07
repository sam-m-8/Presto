import { Context, useContext } from "../../context";
import { useParams } from "react-router-dom";
import useUpdateArchive from "../../useUpdateArchive";

const DeleteComponentButton = ({ componentIndex }) => {
  const buttonStyling = "group flex w-full items-center justify-center gap-2 rounded-lg py-1.5 px-3 hover:bg-indigo-200/20 text-red-400";

  const { getters, setters } = useContext(Context);
  const { id, slideNum } = useParams();
  const slideIndex = slideNum - 1;
  const updateArchive = useUpdateArchive();

  const handleClick = (e) => {
    e.preventDefault();

    // gets a copy of the list of components of the current presentation
    const updatedPresentations = { ...getters.presentations};
    const components = updatedPresentations[id].slides[slideIndex].components;

    // deletes the specified component
    const updatedComponents = { ...components };
    delete updatedComponents[componentIndex];

    // updates the presentation with the updated list of components
    updatedPresentations[id].slides[slideIndex].components = updatedComponents;
    setters.setPresentations(updatedPresentations);
    updateArchive(id, updatedPresentations);
  }

  return (
    <button
      className={buttonStyling}
      onClick={handleClick}
    >
      Delete
    </button>
  );
}

export default DeleteComponentButton;