import { useState } from "react";
import SlideCodeModal from "./SlideCodeModal";
import CodeIcon from "../../assets/code-icon.svg"

const AddCodeButton = () => {
  const buttonStyle = "hover:bg-zinc-300/70 rounded-lg p-2";
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const codeIconStyle = "size-6 md:size-9";

  return (
    <>
      <button
        className={buttonStyle}
        onClick={openModal}
        aria-label="Add code element"
      >
        <img
          src={CodeIcon}
          alt="add code button"
          className={codeIconStyle}
        />
      </button>

      <SlideCodeModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        status="create"
      />
    </>
  )
}

export default AddCodeButton;