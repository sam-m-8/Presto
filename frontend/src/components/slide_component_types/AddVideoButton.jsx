import { useState } from "react";
import VideoIcon from "../../assets/video-icon.svg";
import SlideVideoModal from "./SlideVideoModal";

const AddVideoButton = () => {
  const buttonStyle = "hover:bg-zinc-300/70 rounded-lg p-2";
  
  // add video modal state functionality
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const videoIconStyle = "size-6 md:size-9";

  return (
    <>
      <button
        className={buttonStyle}
        onClick={openModal}
        aria-label="Add video element"
      >
        <img
          src={VideoIcon}
          alt="add video button"
          className={videoIconStyle}
        />
      </button>

      <SlideVideoModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        status="create"
      />
    </>
  )
}

export default AddVideoButton;