import ModalTemplate from "../template/ModalTemplate";
import { Button } from '@headlessui/react';
import { HexColorPicker } from "react-colorful";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context, useContext } from "../../context";
import useUpdateArchive from "../../useUpdateArchive";

const SlideBackgroundPickerModal = ({ isModalOpen, closeModal, initialBackgroundProp = { type: "solid", value: "#FFFFFF" } }) => {
  const { id, slideNum } = useParams();
  const { getters, setters } = useContext(Context);
  const updateArchive = useUpdateArchive();

  const [backgroundType, setBackgroundType] = useState(initialBackgroundProp.type); 
  const [solidColor, setSolidColor] = useState(initialBackgroundProp.value);
  const [leftColour, setLeftColour] = useState(initialBackgroundProp.value);
  const [rightColour, setRightColour] = useState(initialBackgroundProp.value);
  const [imageUrl, setImageUrl] = useState(null);
  const [isDefaultBg, setIsDefaultBg] = useState(false);

  // Reset the values when modal is opened
  useEffect(() => {
    setSolidColor(initialBackgroundProp.value);
    setBackgroundType("solid");
    setIsDefaultBg(false);
    setLeftColour(initialBackgroundProp.value);
    setRightColour(initialBackgroundProp.value);
    setImageUrl(null);
  }, [isModalOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const slideIndex = slideNum - 1;

    // update background value in store according to the background type
    let newBackground;
    switch (backgroundType) {
    case "solid":
      newBackground = solidColor;
      break;
    case "gradient":
      newBackground = `linear-gradient(${leftColour}, ${rightColour})`;
      break;
    case "image":
      newBackground = `url(${imageUrl}) cover;`;
      break;
    }
    
    const updatedSlides = [...getters.presentations[id].slides];

    // update background of all slides if user selected to set this background as the default
    // otherwise update the background of just the current slide
    let updatedPresentations;
    if (isDefaultBg) {
      updatedSlides.forEach((slide, index) => {
        updatedSlides[index] = {
          ...slide,
          background: newBackground
        };
      });

      updatedPresentations = {
        ...getters.presentations,
        [id]: {
          ...getters.presentations[id],
          defaultBg: newBackground,
          slides: updatedSlides
        }
      };
    } else {
      updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        background: newBackground
      };

      updatedPresentations = {
        ...getters.presentations,
        [id]: {
          ...getters.presentations[id],
          slides: updatedSlides
        }
      };
  
    }


    setters.setPresentations(updatedPresentations);
    updateArchive(id, updatedPresentations);
    closeModal();
  }

  const dividerStyle = "mt-7";
  const checkboxContainerStyle = "mt-3";
  const checkboxStyle = "mr-3";
  const labelStyle = "block text-base font-medium text-gray-900";
  const inputStyle = "block w-full rounded-md border-1 mt-2 py-2 px-3 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600";
  const colourPickerStyle = "mt-4  mb-5 flex justify-center";
  const buttonContainerStyle = "mt-4 flex gap-2 justify-end";
  const cancelButtonStyle = "inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-3 text-sm/6 font-semibold text-gray-900 border border-gray-300 shadow-inner shadow-white/10 data-[hover]:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-600";
  const confirmButtonStyle = "inline-flex items-center gap-1 rounded-md bg-indigo-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 data-[hover]:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-zinc-800";
  
  return (
    <ModalTemplate
      title="Update Slide Background"
      isModalOpen={isModalOpen}
    >
      <form onSubmit={handleSubmit}>
        <div className={checkboxContainerStyle}>
          <input 
            type="checkbox"
            id="default-bg-set"
            className={checkboxStyle}
            onChange={(e) => setIsDefaultBg(e.target.checked)}
          />
          <label
            htmlFor="default-bg-set"
          >
            Set as default background
          </label>
        </div>
        <div className={dividerStyle}>
          <label className={labelStyle}>Background Type</label>
          <div className="mt-2">
            <select
              value={backgroundType}
              onChange={e => setBackgroundType(e.target.value)}
              className={inputStyle}
            >
              <option value="solid">Solid Color</option>
              <option value="gradient">Gradient</option>
              <option value="image">Image</option>
            </select>
          </div>
        </div>

        {backgroundType === "solid" && (
          <div className={dividerStyle}>
            <label className={labelStyle} htmlFor="background-colour-set">
              Solid Color
            </label>
            <input
              type="text"
              id="background-colour-set"
              className={inputStyle}
              value={solidColor}
              onChange={e => setSolidColor(e.target.value)}
            />
            <div className={colourPickerStyle}>
              <HexColorPicker
                color={solidColor}
                onChange={setSolidColor}
              />
            </div>
          </div>
        )}

        {backgroundType === "gradient" && (
          <div className={dividerStyle}>
            <label className={labelStyle} htmlFor="gradient-set">
              Gradient colours
            </label>
            <div className={dividerStyle}>
              <label className={labelStyle}>Top colour</label>
              <input
                type="text"
                id="gradient-set"
                className={inputStyle}
                value={leftColour}
                onChange={e => setLeftColour(e.target.value)}
              />
              <div className={colourPickerStyle}>
                <HexColorPicker
                  color={leftColour}
                  onChange={setLeftColour}
                />
              </div>
            </div>
            <div className={dividerStyle}>
              <label className={labelStyle}>Bottom Colour</label>
              <input
                type="text"
                className={inputStyle}
                value={rightColour}
                onChange={e => setRightColour(e.target.value)}
              />
              <div className={colourPickerStyle}>
                <HexColorPicker
                  color={rightColour}
                  onChange={setRightColour}
                />
              </div>
            </div>
          </div>
        )}

        {backgroundType === "image" && (
          <div className={dividerStyle}>
            <label className={labelStyle} htmlFor="image-url-set">
              Image URL
            </label>
            <input
              type="text"
              id="image-url-set"
              className={inputStyle}
              onChange={e => setImageUrl(e.target.value)}
            />
          </div>
        )}

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

export default SlideBackgroundPickerModal;
