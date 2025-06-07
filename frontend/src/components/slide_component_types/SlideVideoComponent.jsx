import styled from "styled-components";
import SlideVideoModal from "./SlideVideoModal";
import { useState } from "react";

// In edit mode video wrapped in div that allows for interacting with
// component without interacting with the iframe
const StyledEditModeWrapper = styled.div`
  position: relative;
  border: none;
  width: 100%;
  height: 100%;
`

// Pointer events disabled in edit mode ie no interacting with the video
const StyledVideoComponent = styled.iframe.withConfig({
  shouldForwardProp: (prop) => prop !== "isPresentMode"
})`
  border: none;
  width: 100%;
  height: 100%;
  pointer-events: ${props => (props.isPresentMode ? "auto" : "none")};
`

const SlideVideoComponent = ({ url, height, width, autoplay, componentIndex, isPresentMode }) => {
  // format the url to be embedded in the page, checking whether user selected autoplay feature in the form
  const getEmbedUrl = (videoUrl) => {
    const autoplayParam = (autoplay && isPresentMode) ? "autoplay=1&mute=1" : "autoplay=0";
    const videoId = videoUrl.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?${autoplayParam}`;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    // make sure edit modal can't be opened in present mode
    if (!isPresentMode) {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <StyledEditModeWrapper
        width={width}
        height={height}
        onDoubleClick={openModal}
      >
        <StyledVideoComponent
          src={getEmbedUrl(url)}
          width={width}
          height={height}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video"
          isPresentMode={isPresentMode}
        />
      </StyledEditModeWrapper>

      <SlideVideoModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        status="edit"
        widthProp={width}
        heightProp={height}
        urlProp={url}
        autoplayProp={autoplay}
        componentIndex={componentIndex}
      />
    </>
  );
}

export default SlideVideoComponent;