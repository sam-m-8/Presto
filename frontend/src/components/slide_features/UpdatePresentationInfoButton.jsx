import penIcon from "../../assets/pen-edit-icon.svg";
import { useState } from "react";
import UpdatePresentationInfoModal from "./UpdatePresentationInfoModal";


const UpdatePresentationInfoButton = () => {
  const editIconStyle = "h-4 md:h-7 w-auto";
  const buttonStyle = "bg-transparent hover:bg-white/20 py-1 px-1 rounded-lg inline-flex gap-2 items-center";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        className={buttonStyle}
        onClick={openModal}
      >
        <img
          src={penIcon}
          alt="Update presentation title and description"
          className={editIconStyle}
        />
      </button>
  
      <UpdatePresentationInfoModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalTitle="Update Presentation Details"
        type="edit"
      />
    </>
  );
}

export default UpdatePresentationInfoButton;