import ModalTemplate from "../template/ModalTemplate";
import { useState, useEffect } from "react";
import { Button } from '@headlessui/react';
import { useParams } from "react-router-dom";
import { Context, useContext } from "../../context";
import useUpdateArchive from "../../useUpdateArchive";

const SlideVideoModal = (
  { isModalOpen, closeModal, status, widthProp= 30, heightProp = 20,
    urlProp= "", autoplayProp = false, componentIndex = null
  }) => {
  const sameLineInputStyle = "flex";
  const labelStyle = "block text-base font-medium text-gray-900";
  const buttonContainerStyle = "mt-4 flex gap-2 justify-end";
  const cancelButtonStyle = "inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-3 text-sm/6 font-semibold text-gray-900 border border-gray-300 shadow-inner shadow-white/10 data-[hover]:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-600";
  const confirmButtonStyle = "inline-flex items-center gap-1 rounded-md bg-indigo-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 data-[hover]:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-zinc-800";
  const inputStyle = "block w-full rounded-md border-1 mt-2 py-2 px-3 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
  const dividerStyle = "mt-7";
  const inlineInputStyle = "block w-20 mr-6 rounded-md border-1 mt-2 py-2 px-3 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
  const checkboxDividerStyle = "mt-7 inline-flex gap-3"

  const [width, setWidth] = useState(widthProp);
  const [height, setHeight] = useState(heightProp);
  const [videoUrl, setVideoUrl] = useState(urlProp);
  const [isAutoplay, setIsAutoplay] = useState(autoplayProp);

  const { id, slideNum } = useParams();
  const { getters, setters } = useContext(Context);
  const updateArchive = useUpdateArchive();

  const createStatus = status === "create";

  // Resets form data when modal is opened
  useEffect(() => {
    setWidth(widthProp);
    setHeight(heightProp);
    setVideoUrl(urlProp);
    setIsAutoplay(autoplayProp);
  }, [isModalOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const slideIndex = slideNum - 1;

    // create a new video component object
    const newComponent = {
      type: "video",
      width: String(width),
      height: String(height),
      url: videoUrl,
      autoplay: isAutoplay,
      left: "0",
      top: "0"
    };

    const newComponentId = Date.now().toString();
    const focusSlide = getters.presentations[id].slides[slideIndex];

    // Add new component to the current slide's components / or updates
    // current components details
    const indexToUpdate = createStatus ? newComponentId : componentIndex;
    const updatedSlide = {
      ...focusSlide,
      components: {
        ...focusSlide.components,
        [indexToUpdate]: newComponent,
      },
    };

    const updatedSlides = [...getters.presentations[id].slides];
    updatedSlides[slideIndex] = updatedSlide;
    // Update the current presentation with its updated slides
    const updatedPresentations = {
      ...getters.presentations,
      [id]: {
        ...getters.presentations[id],
        slides: updatedSlides,
      },
    };

    setters.setPresentations(updatedPresentations);
    updateArchive(id, updatedPresentations);
    closeModal();
  }

  return (
    <ModalTemplate
      title={createStatus ? "New Video Element" : "Update Video Element"}
      isModalOpen={isModalOpen}
    >
      <form onSubmit={handleSubmit}>
        <div className={sameLineInputStyle}>
          {createStatus && (
            <div className={dividerStyle}>
              <label
                className={labelStyle}
                htmlFor="width-set"
              >
                Width
              </label>
              <input
                required
                id="width-set"
                type="number"
                inputMode="numeric"
                min="0"
                max="100"
                className={inlineInputStyle}
                value={width}
                onChange={e => setWidth(e.target.value)}
              />
            </div>
          )}

          {createStatus && (
            <div className={dividerStyle}>
              <label
                className={labelStyle}
                htmlFor="height-set"
              >
                Height
              </label>
              <input
                required
                type="number"
                inputMode="numeric"
                min="0"
                max="100"
                id="height-set"
                className={inlineInputStyle}
                onChange={e => setHeight(e.target.value)}
                value={height}
              />
            </div>
          )}
        </div>

        <div className={dividerStyle}>
          <label
            className={labelStyle}
            htmlFor="image-set"
          >
            Video URL (from YouTube)
          </label>
          <input
            required
            type="text"
            id="image-set"
            className={inputStyle}
            onChange={e => setVideoUrl(e.target.value)}
            value={videoUrl || ""}
          />
        </div>

        <div className={checkboxDividerStyle}>
          <input
            id="autoplay-set"
            type="checkbox"
            onChange={e => setIsAutoplay(e.target.checked)}
            checked={isAutoplay}
          />
          <label
            className={labelStyle}
            htmlFor="autoplay-set"
          >
            Auto-play video
          </label>
        </div>

        <div className={buttonContainerStyle}>
          <Button
            className={cancelButtonStyle}
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={confirmButtonStyle}
          >
            Confirm
          </Button>
        </div>
      </form>

    </ModalTemplate>
  )

}

export default SlideVideoModal;