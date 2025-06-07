import { useEffect, useState } from "react";
import ModalTemplate from "../template/ModalTemplate";
import { Button } from "@headlessui/react"
import { Context, useContext } from "../../context";
import { useParams } from "react-router-dom";

const TransitionsModal = ({ isModalOpen, closeModal }) => {
  const { getters, setters } = useContext(Context);
  const { id } = useParams();

  const [selectedTransition, setSelectedTransition] = useState(getters.presentations[id].transition || "none");

  // reset values each time modal is closed
  useEffect(() => {
    setSelectedTransition(getters.presentations[id].transition || "none")
  }, [closeModal]);
  
  // update presentations store with selected transition
  useEffect(() => {
    const updatedPresentations = {
      ...getters.presentations,
      [id]: {
        ...getters.presentations[id],
        transition: selectedTransition
      }
    }
    setters.setPresentations(updatedPresentations);
  }, [selectedTransition]);


  const smallTextStyle = "text-zinc-500";
  const transitionsContainer = "flex mt-6 justify-evenly";
  const transitionContainer = "flex flex-col items-center gap-2 text-indigo-500";
  const transitionButtonStyle = "p-2 border-2 border-zinc-400 rounded-lg hover:border-indigo-500 hover:border-3 focus:border-indigo-500 focus:bg-indigo-100";
  const selectedButtonStyle = "bg-indigo-100 border-indigo-500";
  const doneButtonStyle = "inline-flex items-center gap-1 rounded-md bg-indigo-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 data-[hover]:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-zinc-800";
  const doneButtonContainerStyle = "flex justify-end mt-4"
  return (
    <ModalTemplate
      isModalOpen={isModalOpen}
      title="Select a Transition"
    >
      <div className={smallTextStyle}>
        <small>
          Applies to all slides in this presentation.
        </small>
      </div>
      <div className={transitionsContainer}>
        <div className={transitionContainer}>
          <button className={`${transitionButtonStyle} ${selectedTransition === "fade" ? selectedButtonStyle : ""}`} onClick={() => setSelectedTransition("fade")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>
          </button>
          <p>Fade In-Out</p>
        </div>
        <div className={transitionContainer}>
          <button className={`${transitionButtonStyle} ${selectedTransition === "none" ? selectedButtonStyle : ""}`} onClick={() => setSelectedTransition("none")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </button>
          <p>None</p>
        </div>
      </div>
      <div className={doneButtonContainerStyle}>
        <Button className={doneButtonStyle} onClick={closeModal}>
          Done
        </Button>
      </div>
    </ModalTemplate>
  )
}

export default TransitionsModal;