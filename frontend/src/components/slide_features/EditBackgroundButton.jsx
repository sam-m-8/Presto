import { useState } from "react";
import ColourWheel from "../../assets/colour-wheel-icon.svg";
import SlideBackgroundPickerModal from "./SlideBackgroundPickerModal";

const EditBackgroundButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const buttonStyle = "text-black hover:bg-zinc-300/70 rounded-lg";
  const iconStyle = "size-6 md:size-9";
  return (
    <>
      <button
        className={buttonStyle}
        onClick={openModal}
        aria-label="Update background"
      >
        <img
          src={ColourWheel}
          alt="edit background colour button"
          className={iconStyle}
        />
      </button>

      <SlideBackgroundPickerModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </>
  )
}

export default EditBackgroundButton;
