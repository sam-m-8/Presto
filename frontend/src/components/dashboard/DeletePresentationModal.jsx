import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, Context } from '../../context';
import { BACKEND_PORT } from "../../../backend.config.json";
import { useState } from "react";
import ErrorModal from "../template/ErrorModal";

const DeletePresentationModal = ({isModalOpen, closeModal, id}) => {
  const navigate = useNavigate();
  const { getters, setters } = useContext(Context);

  // error modal state handling
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const openErrorModal = (message) => {
    setErrorMsg(message); 
    setIsErrorModalOpen(true);
  };
  const closeErrorModal = () => setIsErrorModalOpen(false);

  const handleDelete = () => {
    // create a copy of the current presentations frontend store 
    const updatedPresentations = getters.presentations;
    
    // delete from frontend store
    delete updatedPresentations[id];
    setters.setPresentations(updatedPresentations);

    // delete/update backend database
    axios.put(`http://localhost:${BACKEND_PORT}/store`, {
      store: {
        presentations: updatedPresentations
      }
    }, {
      headers: { Authorization: `Bearer ${getters.token}` }
    })
      .then(() => {
        // redirect users to the dashboard
        navigate("/dashboard");
        closeModal();
      })
      .catch((err) => {
        openErrorModal(err.message);
      });
  }

  const dialogStyle = "relative z-10 focus:outline-none";
  const outerDivStyle = "fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity";
  const innerDivStyle = "flex min-h-full items-center justify-center p-4";
  const dialogPanelStyle = "w-full max-w-md rounded-xl bg-white border border-gray-300 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0";
  const dialogTitleStyle = "text-base/7 font-medium text-black";
  const paragraphStyle = "mt-2 text-sm/6 text-gray-500";
  const buttonContainerStyle = "mt-4 flex gap-2 justify-end";
  const cancelButtonStyle = "inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-3 text-sm/6 font-semibold text-gray-900 border border-gray-300 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700";
  const deleteButtonStyle = "inline-flex items-center gap-1 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700";
  return (
    <>
      <Dialog open={isModalOpen} as="div" className={dialogStyle} onClose={closeModal}>
        <div className={outerDivStyle}>
          <div className={innerDivStyle}>
            <DialogPanel className={dialogPanelStyle} >
              <DialogTitle as="h3" className={dialogTitleStyle}>
                Are you sure you want to delete this presentation?
              </DialogTitle>
              <p className={paragraphStyle}>
                You won&apos;t be able to undo your changes.
              </p>
              <div className={buttonContainerStyle}>
                <Button
                  className={cancelButtonStyle}
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  className={deleteButtonStyle}
                  onClick={handleDelete}
                  id="delete-presentation-button"
                >
                  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  Delete
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <ErrorModal
        errorMsg={errorMsg} 
        isModalOpen={isErrorModalOpen} 
        closeModal={closeErrorModal} 
      />
    </>
  )
}

export default DeletePresentationModal;
