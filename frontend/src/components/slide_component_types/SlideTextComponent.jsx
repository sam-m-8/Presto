import styled from "styled-components";
import { useState } from "react";
import SlideTextModal from "./SlideTextModal";

const StyledTextComponent = styled.div`
  position: relative;
  overflow: hidden;
  color: ${props => props.color};
  font-size: ${props => props.fontSize}em;
  white-space: pre-wrap;
  font-family: ${(props) => props.fontFamily || 'Arial, sans-serif'};
  width: 100%;
  height: 100%;
`;


const SlideTextComponent = ({
  content, fontColour, fontSize, fontFamily, height, width,
  componentIndex, isPresentMode
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    if (!isPresentMode) {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <StyledTextComponent
        color={fontColour}
        fontSize={fontSize}
        fontFamily={fontFamily}
        onDoubleClick={openModal}
        tabIndex="0"
      >
        {content}
      </StyledTextComponent>

      <SlideTextModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        status="edit"
        fontColourProp={fontColour}
        fontSizeProp={fontSize}
        fontFamilyProp={fontFamily}
        widthProp={width}
        heightProp={height}
        contentProp={content}
        componentIndex={componentIndex}
      />
    </>
  );
}

export default SlideTextComponent;