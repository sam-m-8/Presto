import ModalTemplate from "./ModalTemplate";
import { Button } from "@headlessui/react";

const ErrorModal = ({ errorMsg, isModalOpen, closeModal }) => {

  const closeButtonStyle = "items-center gap-2 rounded-md bg-white py-1.5 px-3 text-sm/6 font-semibold text-gray-900 border border-gray-300 shadow-inner shadow-white/10 data-[hover]:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-600";
  const buttonContainerStyle = "w-full flex justify-end"
  return (
    <ModalTemplate
      title="Error"
      isModalOpen={isModalOpen}
    >
      {errorMsg}
      <div className={buttonContainerStyle}>
        <Button
          className={closeButtonStyle}
          onClick={closeModal}
        >
          Close
        </Button>
      </div>
    </ModalTemplate>
  )
}

export default ErrorModal;