import styled from "styled-components";
import SlideImageModal from "./SlideImageModal";
import { useState } from "react";

const StyledImageComponent = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: fit; /* fit image without stretching it */
`;

const SlideImageComponent = ({ url, alt, height, width, componentIndex, isPresentMode }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    // make sure modal can't be opened in present mode
    if (!isPresentMode) {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <StyledImageComponent
        src={url}
        alt={alt}
        width={width}
        height={height}
        draggable="false"
        onDoubleClick={openModal}
      />

      <SlideImageModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        status="edit"
        widthProp={width}
        heightProp={height}
        urlProp={url}
        altProp={alt}
        componentIndex={componentIndex}
      />
    </>
  );
}

export default SlideImageComponent;