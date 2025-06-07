import styled from "styled-components";
import { CodeBlock } from "react-code-blocks";
import { useEffect, useState } from "react";
import SlideCodeModal from "./SlideCodeModal";
import flourite from "flourite";

const StyledCodeComponent = styled.div`
  position: relative;
  overflow: hidden;
  font-size: ${props => props.fontSize}em;
  width: 100%;
  height: 100%;
`;

const SlideCodeComponent = ({ content, fontSize, height, width, componentIndex, isPresentMode }) => {
  const [detectedLanguage, setDetectedLanguage] = useState("plaintext");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    if (!isPresentMode) {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // detect the language of the user's input using flourite and update language state
    // lowercase as react-code-blocks library language prop only registers lowercase
    const language = flourite(content).language.toString().toLowerCase();
    setDetectedLanguage(language);
  }, [content]);

  const codeFontStyle = "font-mono";
  return (
    <>
      <StyledCodeComponent
        fontSize={fontSize}
        width={width}
        height={height}
        className={codeFontStyle}
        onDoubleClick={openModal}
      >
        <CodeBlock 
          text={content}
          language={detectedLanguage} 
          theme="atom-one-dark"
          showLineNumbers={true}
        />
      </StyledCodeComponent>

      <SlideCodeModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        status="edit"
        fontSizeProp={fontSize}
        widthProp={width}
        heightProp={height}
        contentProp={content}
        componentIndex={componentIndex}
      />
    </>
  )
}

export default SlideCodeComponent;