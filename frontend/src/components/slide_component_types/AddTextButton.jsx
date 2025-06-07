import { useState } from "react";
import SlideTextModal from "./SlideTextModal";

const AddTextButton = () => {
  const buttonStyle = "text-black hover:bg-zinc-300/70 rounded-lg px-3";
  const textStyle = "text-xs md:text-base border-dashed border md:px-2 md:border-2 px-1 border-black font-bold";
  
  // add text modal state functionality
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <>
      <button
        className={buttonStyle}
        onClick={openModal}
        aria-label="Add text element"
      >
        <p className={textStyle}>
          T
        </p>
      </button>

      <SlideTextModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        status="create"
      />
    </>
  );
}

export default AddTextButton;