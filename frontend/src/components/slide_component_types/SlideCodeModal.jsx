import { useState, useEffect } from "react";
import { Button } from '@headlessui/react';
import ModalTemplate from "../template/ModalTemplate";
import { Context, useContext } from "../../context";
import { useParams } from "react-router-dom";
import useUpdateArchive from "../../useUpdateArchive";

const SlideCodeModal = (
  { isModalOpen, closeModal, status, fontSizeProp = 1, widthProp = 40,
    heightProp = 20, contentProp = "", componentIndex = null
  }) => {
  const { id, slideNum } = useParams();
  const { getters, setters } = useContext(Context);
  const updateArchive = useUpdateArchive();

  const [width, setWidth] = useState(widthProp);
  const [height, setHeight] = useState(heightProp);
  const [code, setCode] = useState(contentProp);
  const [fontSize, setFontSize] = useState(fontSizeProp);

  const createStatus = status === "create";

  // reset values on open/close of modal
  useEffect(() => {
    setWidth(widthProp);
    setHeight(heightProp);
    setCode(contentProp);
    setFontSize(fontSizeProp);
  }, [isModalOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const slideIndex = slideNum - 1;

    // create new code component with the form values
    const newComponent = {
      type: "code",
      width: String(width),
      height: String(height),
      content: code,
      fontSize: String(fontSize),
      left: "0",
      top: "0",
    };

    const newComponentId = Date.now().toString();
    const focusSlide = getters.presentations[id].slides[slideIndex];

    // add new component to the current slide's components / or updates current components details
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

    // update the current presentation with its updated slides
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

  const buttonContainerStyle = "mt-4 flex gap-2 justify-end";
  const cancelButtonStyle = "inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-3 text-sm/6 font-semibold text-gray-900 border border-gray-300 shadow-inner shadow-white/10 data-[hover]:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-600";
  const confirmButtonStyle = "inline-flex items-center gap-1 rounded-md bg-indigo-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 data-[hover]:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-zinc-800";
  const labelStyle = "block text-base font-medium text-gray-900";
  const dividerStyle = "mt-7";
  const sameLineInputStyle = "flex";
  const inlineInputStyle = "block w-20 mr-6 rounded-md border-1 mt-2 py-2 px-3 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600";
  const textAreaStyle = "block w-full mt-2 h-64 bg-zinc-200 text-zinc-500 font-mono rounded-md border p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-600";

  return (
    <ModalTemplate
      title={createStatus ? "New Code Element" : "Update Code Element"}
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
                Width (%)
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
                Height (%)
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
            htmlFor="code-set"
          >
            Code
          </label>
          <textarea 
            required
            id="code-set"
            className={textAreaStyle}
            placeholder="Enter your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
  )
}

export default SlideCodeModal;