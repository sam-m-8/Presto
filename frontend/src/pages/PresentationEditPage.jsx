import DeletePresentationButton from "../components/dashboard/DeletePresentationButton";
import DeletePresentationModal from "../components/dashboard/DeletePresentationModal";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import SlideCard from "../components/slide_editor/SlideCard";
import AddNewSlideButton from "../components/slide_editor/AddNewSlideButton";
import NextSlideButton from "../components/slide_editor/NextSlideButton";
import PreviousSlideButton from "../components/slide_editor/PreviousSlideButton";
import EditorHeader from "../components/slide_editor/EditorHeader";
import DeleteSlideButton from "../components/slide_editor/DeleteSlideButton";
import SlideNumberProgress from "../components/slide_editor/SlideNumberProgress";
import ComponentsToolbar from "../components/slide_editor/ComponentsToolbar";

const PresentationEditPage = () => {
  // initialise state functionality for delete modal 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { id } = useParams();

  const pageContainerStyle = "h-screen bg-zinc-100";
  const slideInfoContainerStyle = "flex-row mx-2 py-8 justify-center";
  const slideInfoHeaderContainerStyle = "inline-flex w-full justify-between px-12 md:px-24 lg:px-44 xl:px-64";
  const slideInfoBodyContainerStyle = "flex gap-3 justify-center"
  const arrowButtonContainer = "flex items-center";
  const footerContainerStyle = "sm:flex-row justify-center lg:block w-2/3 md:w-2/5 m-auto";

  return (
    <div className={pageContainerStyle}>
      <EditorHeader/>
      <div className={slideInfoContainerStyle}>
        <div className={slideInfoHeaderContainerStyle}>
          <DeleteSlideButton />
          <SlideNumberProgress />
          <AddNewSlideButton />
        </div>
        <div className={slideInfoBodyContainerStyle}>
          <div className={arrowButtonContainer}>
            <PreviousSlideButton />
          </div>
          <SlideCard />
          <div className={arrowButtonContainer}>
            <NextSlideButton />
          </div>
        </div>
      </div>
      <div className={footerContainerStyle}>
        <ComponentsToolbar />
        <DeletePresentationButton openModal={openModal} />
        <DeletePresentationModal isModalOpen={isModalOpen} closeModal={closeModal} id={id} />
      </div>
    </div>
  )
}

export default PresentationEditPage;