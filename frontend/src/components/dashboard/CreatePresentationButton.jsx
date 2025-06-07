import { useState } from "react";
import UpdatePresentationInfoModal from "../slide_features/UpdatePresentationInfoModal";

const CreatePresentationButton = () => {
  const buttonStyle = "gap-2 inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-base px-3 py-2 md:px-6 transform transition duration-300 ease-in-out";
  const createButtonSvgStyle = "size-5";
  const spanStyle = "hidden md:inline-block";

  // create presentation modal state functionality
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button className={buttonStyle} onClick={openModal}>
        <svg className={createButtonSvgStyle} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"/>
        </svg>
        <p>
          Create <span className={spanStyle}>a Presentation</span>
        </p>
      </button>

      <UpdatePresentationInfoModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalTitle="Create New Presentation"
        type="create"
      />
    </>
  );
}

export default CreatePresentationButton;