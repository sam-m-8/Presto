import ModalTemplate from "../template/ModalTemplate";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { Context, useContext } from "../../context";
import { useParams } from "react-router-dom";
import { Button } from '@headlessui/react';
import useUpdateArchive from "../../useUpdateArchive";

const RearrangeSlidesModal = ({ isModalOpen, closeModal }) => {
  const { getters, setters } = useContext(Context);
  const { id } = useParams();
  const updateArchive = useUpdateArchive();

  const [slides, setSlides] = useState(getters.presentations[id].slides);
  const [showPopup, setShowPopup] = useState(false);
  const [sourcePosition, setSourcePosition] = useState();
  const [destPosition, setDestPosition] = useState();

  // update the order of the slides if it changed once user has finished dragging 
  const handleDragEnd = (result) => {
    if (!result.destination) return;  

    const reorderedSlides = Array.from(slides);
    const [updatedSlide] = reorderedSlides.splice(result.source.index, 1);
    reorderedSlides.splice(result.destination.index, 0, updatedSlide);

    // update the order of the slides and the positions of slide that was move
    setSlides(reorderedSlides);
    setSourcePosition(result.source.index + 1);
    setDestPosition(result.destination.index + 1);

    setShowPopup(true);
  } 

  // render slides order according to the store every time the modal state gets updated
  useEffect(() => {
    setSlides(getters.presentations[id].slides);
  }, [isModalOpen]);

  // every time slides is updated, updates the presentation's slides to reflect this 
  useEffect(() => {
    const updatedPresentations = {
      ...getters.presentations,
      [id]: {
        ...getters.presentations[id],
        slides: slides,
      },
    };

    setters.setPresentations(updatedPresentations);
    updateArchive(id, updatedPresentations);
  }, [slides]);

  const handleCloseModal = () => {
    setShowPopup(false);
    closeModal();
  }

  const buttonContainerStyle = "mt-4 flex gap-2 justify-end";
  const closeButtonStyle = "inline-flex items-center gap-1 rounded-md bg-indigo-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 data-[hover]:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-zinc-800";
  return (
    <ModalTemplate
      title="Rearrange Slide Order"
      isModalOpen={isModalOpen}
      panelMaxWidth="max-w-[90%]"
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="slides" direction="vertical">
          {(provided) => (
            <div
              className="flex flex-wrap gap-4 p-4"
              ref={provided.innerRef}
            >
              {slides.map((slide, index) => (
                <Draggable key={`slide-${index}`} draggableId={`slide-${index}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="slide-box w-32 h-20 bg-gray-700 text-white flex items-center justify-center rounded-md text-center shadow-md"
                    >
                      <p>Slide {index + 1}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {showPopup && (
        <div className="absolute flex flex-col items-end top-0 right-0 p-4 bg-white shadow-lg rounded-md">
          <p className="text-lg">Moved slide from position {sourcePosition} to position {destPosition}.</p>
          <button className="hover:bg-zinc-200/40 rounded px-2 mt-1 border" onClick={() => setShowPopup(false)}>
            Done
          </button>
        </div>
      )}
      <div className={buttonContainerStyle}>
        <Button className={closeButtonStyle} onClick={handleCloseModal}>
          Close
        </Button>
      </div>
    </ModalTemplate>
  )
}

export default RearrangeSlidesModal;