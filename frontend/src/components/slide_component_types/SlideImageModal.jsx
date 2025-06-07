import ModalTemplate from "../template/ModalTemplate";
import { useState, useEffect } from "react";
import { Button } from '@headlessui/react';
import { useParams } from "react-router-dom";
import { Context, useContext } from "../../context";
import useUpdateArchive from "../../useUpdateArchive";

const SlideImageModal = (
  { isModalOpen, closeModal, status, widthProp = 30, heightProp = 20,
    urlProp = "", altProp = "",  componentIndex = null
  }) => {
  const buttonContainerStyle = "mt-4 flex gap-2 justify-end";
  const cancelButtonStyle = "inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-3 text-sm/6 font-semibold text-gray-900 border border-gray-300 shadow-inner shadow-white/10 data-[hover]:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-600";
  const confirmButtonStyle = "inline-flex items-center gap-1 rounded-md bg-indigo-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 data-[hover]:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-zinc-800";
  const inputStyle = "block w-full rounded-md border-1 mt-2 py-2 px-3 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
  const labelStyle = "block text-base font-medium text-gray-900";
  const dividerStyle = "mt-7";
  const sameLineInputStyle = "flex"
  const inlineInputStyle = "block w-20 mr-6 rounded-md border-1 mt-2 py-2 px-3 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"

  const [width, setWidth] = useState(widthProp);
  const [height, setHeight] = useState(heightProp);
  const [imageUrl, setImageUrl] = useState(urlProp);
  const [imgDescription, setImgDescription] = useState(altProp);

  const { id, slideNum } = useParams();
  const { getters, setters } = useContext(Context);
  const updateArchive = useUpdateArchive();

  const createStatus = status === "create";

  // Resets form data when modal is opened
  // (to default values if new component or current values if editing)
  useEffect(() => {
    setWidth(widthProp);
    setHeight(heightProp);
    setImageUrl(urlProp);
    setImgDescription(altProp);
  }, [isModalOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const slideIndex = slideNum - 1;

    // Construct new component from form data
    const newComponent = {
      type: "image",
      width: String(width),
      height: String(height),
      url: imageUrl,
      alt: imgDescription,
      left: "0",
      top: "0",
    };

    const newComponentId = Date.now().toString();
    const focusSlide = getters.presentations[id].slides[slideIndex];

    // Add new component to the current slide's components
    // Adds new index if new component or updates current index if editing
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
      title={createStatus ? "New Image Element" : "Update Image Element"}
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
            Image URL
          </label>
          <input
            required
            type="text"
            id="image-set"
            className={inputStyle}
            onChange={e => setImageUrl(e.target.value)}
            // onBlur={e => checkUrlValidity(e.target.value)}
            value={imageUrl || ""}
          />
        </div>

        <div className={dividerStyle}>
          <label
            className={labelStyle}
            htmlFor="alt-set"
          >
              Image Description
          </label>
          <input
            required
            id="alt-set"
            type="text"
            className={inputStyle}
            value={imgDescription}
            onChange={e => setImgDescription(e.target.value)}
          />
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
  );

}

export default SlideImageModal;