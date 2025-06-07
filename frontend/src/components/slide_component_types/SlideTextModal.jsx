import { useState, useEffect } from "react";
import { Button } from '@headlessui/react';
import ModalTemplate from "../template/ModalTemplate";
import { HexColorPicker } from "react-colorful";
import { Context, useContext } from "../../context";
import { useParams } from "react-router-dom";
import useUpdateArchive from "../../useUpdateArchive";

const SlideTextModal = (
  { isModalOpen, closeModal, status, fontColourProp = "#000000",
    fontFamilyProp = 'Arial, sans-serif', fontSizeProp = 1, widthProp = 40, heightProp = 20,
    contentProp = "", componentIndex = null
  }) => {
  const buttonContainerStyle = "mt-4 flex gap-2 justify-end";
  const cancelButtonStyle = "inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-3 text-sm/6 font-semibold text-gray-900 border border-gray-300 shadow-inner shadow-white/10 data-[hover]:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-600";
  const confirmButtonStyle = "inline-flex items-center gap-1 rounded-md bg-indigo-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 data-[hover]:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-zinc-800";
  const inputStyle = "block w-full rounded-md border-1 mt-2 py-2 px-3 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
  const labelStyle = "block text-base font-medium text-gray-900";
  const dividerStyle = "mt-7";
  const sameLineInputStyle = "inline-flex"
  const inlineInputStyle = "block w-20 mr-6 rounded-md border-1 mt-2 py-2 px-3 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
  const colourPickerStyle = "mt-4  mb-5 flex justify-center"

  const [width, setWidth] = useState(widthProp);
  const [height, setHeight] = useState(heightProp);
  const [text, setText] = useState(contentProp);
  const [fontSize, setFontSize] = useState(fontSizeProp);
  const [colour, setColour] = useState(fontColourProp);
  const [fontFamily, setFontFamily] = useState(fontFamilyProp);

  const { id, slideNum } = useParams();
  const { getters, setters } = useContext(Context);
  const updateArchive = useUpdateArchive();

  const createStatus = status === "create";

  // Resets form data when modal is opened (maintains last selected colour)
  useEffect(() => {
    setWidth(widthProp);
    setHeight(heightProp);
    setText(contentProp);
    setFontSize(fontSizeProp);
    setColour(fontColourProp);
    setFontFamily(fontFamilyProp);
  }, [isModalOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const slideIndex = slideNum - 1;

    // Construct new component from form data
    const newComponent = {
      type: "text",
      width: String(width),
      height: String(height),
      content: text,
      fontSize: String(fontSize),
      fontFamily: String(fontFamily),
      fontColour: colour,
      left: 0,
      top: 0
    };

    const newComponentId = Date.now().toString();
    const focusSlide = getters.presentations[id].slides[slideIndex];

    // Add new component to the current slide's components
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
      title={createStatus ? "New Text Element" : "Update Text Element"}
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

          <div className={dividerStyle}>
            <label
              className={labelStyle}
              htmlFor="font-size-set"
            >
              Font Size
            </label>
            <input
              required
              type="number"
              id="font-size-set"
              inputMode="numeric"
              className={inlineInputStyle}
              onChange={e => setFontSize(e.target.value)}
              value={fontSize}
            />
          </div>
        </div>

        <div className={dividerStyle}>
          <label
            className={labelStyle}
            htmlFor="text-set"
          >
            Content
          </label>
          <textarea
            required
            id="text-set"
            type="text"
            className={inputStyle}
            value={text}
            onChange={e => setText(e.target.value)}
          >
          </textarea>
        </div>
        
        <div>
          <div className={dividerStyle}>
            <label htmlFor="font-dropdown">Font Family</label>
            <div className="mt-2">
              <select
                id="font-dropdown"
                className={inputStyle}
                value={fontFamily}
                onChange={e => setFontFamily(e.target.value)}
              >
                <option value="Arial, sans-serif" className="">Arial</option>
                <option value="'Comic Sans MS', cursive">Comic Sans</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
              </select>
            </div>
          </div>
          <div className={dividerStyle}>
            <label
              className={labelStyle}
              htmlFor="font-colour-set"
            >
              Font Colour
            </label>
            <input
              type="text"
              id="font-colour-set"
              className={inputStyle}
              value={colour}
              onChange={e => setColour(e.target.value)}
            />
            <div className={colourPickerStyle}>
              <HexColorPicker
                color={colour}
                onChange={setColour}
              />
            </div>

          </div>
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

export default SlideTextModal;