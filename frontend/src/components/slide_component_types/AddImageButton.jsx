import { useState } from "react";
import SlideImageModal from "./SlideImageModal";
import ImageIcon from "../../assets/image-icon.svg";

const AddImageButton = () => {
  const buttonStyle = "hover:bg-zinc-300/70 rounded-lg p-2";
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const imageIconStyle = "size-6 md:size-9";

  return (
    <>
      <button
        className={buttonStyle}
        onClick={openModal}
        aria-label="Add image element"
      >
        <img
          src={ImageIcon}
          alt="add image button"
          className={imageIconStyle}
        />
      </button>

      <SlideImageModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        status="create"
      />
    </>
  )
}

export default AddImageButton;