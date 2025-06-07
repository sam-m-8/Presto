import { Button } from '@headlessui/react'
import ModalTemplate from '../template/ModalTemplate';
import { useEffect, useState } from 'react';
import { Context, useContext } from "../../context";
import { useParams } from "react-router-dom";

const UpdatePresentationInfoModal = ({ isModalOpen, closeModal, modalTitle, type }) => {
  const buttonContainerStyle = "mt-4 flex gap-2 justify-end";
  const cancelButtonStyle = "inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-3 text-sm/6 font-semibold text-gray-900 border border-gray-300 shadow-inner shadow-white/10 data-[hover]:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-600";
  const confirmButtonStyle = "inline-flex items-center gap-1 rounded-md bg-indigo-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 data-[hover]:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-zinc-800";
  const inputStyle = "block w-full rounded-md border-1 mt-2 py-2 px-3 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
  const labelStyle = "block text-base font-medium text-gray-900";
  const dividerStyle = "mt-7";
  const previewImageStyle = "h-15 mt-3 p-5"
  const imgContainerStyle = "flex items-center justify-center"

  const { id } = useParams();
  const { getters, setters } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [validUrl, setValidUrl] = useState(true);

  // Resets form data when modal is opened
  useEffect(() => {
    if (type === "edit") {
      setTitle(getters.presentations[id].title);
      setDescription(getters.presentations[id].description || "");
      setThumbnail(getters.presentations[id].thumbnail || "");
      setValidUrl(true);
    }
  }, [isModalOpen]);

  // Creates new image object and attempts to load the image with the provided
  // url, setting to invalid if there is an error or valid if successful
  const checkUrlValidity = (url) => {
    const img = new Image();

    img.onload = () => {
      setValidUrl(true);
    };

    img.onerror = () => {
      setValidUrl(false);
    }

    // loads image with url as source trigerring either of the above
    img.src = url;
  }

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.value);
    setValidUrl("pending");
  }

  // Updates current presentation's store to reflect changes in title,
  // description and thumbnail
  const handleSubmit = (event) => {
    event.preventDefault();

    // Set to default blank thumbnail if not provided/invalid
    if (!thumbnail || !validUrl) {
      setThumbnail(null);
    }

    if (type === "edit") {
      const updatedPresentation = {
        id: getters.presentations[id].id,
        title: title,
        thumbnail: (!thumbnail || !validUrl) ? null : thumbnail,
        description: description,
        slides: getters.presentations[id].slides
      };

      setters.setPresentations({ ...getters.presentations, [id]: updatedPresentation });

    } else {
      // generate unique id for the new presentation
      const newId = Date.now().toString();
      const newPresentation = {
        id: newId,
        title: title,
        thumbnail: (!thumbnail || !validUrl) ? null : thumbnail,
        description: description,
        transition: "none",
        slides: [{
          background: "#ffffff",
          components: [] // array of objects of each component on the slide
        }],
        archive: {},
      };

      // append new presentation to frontend global presentations object and backend
      setters.setPresentations({ ...getters.presentations, [newId]: newPresentation });
    }

    closeModal();
  }

  return (
    <>
      <ModalTemplate
        title={modalTitle}
        isModalOpen={isModalOpen}
      >
        <form onSubmit={handleSubmit} className="pt-3">
          <label
            className={labelStyle}
            htmlFor="title-update"
          >
            Title
          </label>
          <input
            required
            id="title-update"
            type="text"
            className={inputStyle}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <div className={dividerStyle}>
            <label
              className={labelStyle}
              htmlFor="description-update"
            >
              Description
            </label>
            <textarea
              id="description-update"
              type="text"
              className={inputStyle}
              value={description}
              onChange={e => setDescription(e.target.value)}
            >
            </textarea>
          </div>

          <div className={dividerStyle}>
            <label
              className={labelStyle}
              htmlFor="thumbnail-update"
            >
              Thumbnail URL
            </label>
            <input
              type="text"
              id="thumbnail-update"
              className={inputStyle}
              onChange={handleThumbnailChange}
              onBlur={e => checkUrlValidity(e.target.value)}
              value={thumbnail || ""}
            />
          </div>

          {/* Preview of image shown if thumbnail url is valid */}
          {validUrl === true && thumbnail && (
            <div className={imgContainerStyle}>
              <img
                src={thumbnail}
                className={previewImageStyle}
              />
            </div>
          )}

          {/* Error message shown if thumbnail url is invalid */}
          {!validUrl && thumbnail && (
            <div className="text-red-600 mt-2">Invalid image URL</div>
          )}

          <div className={buttonContainerStyle}>
            <Button
              className={cancelButtonStyle}
              onClick={closeModal}
            >
              Cancel
            </Button>
            {type === "edit"
              ?
              <Button
                type="submit"
                className={confirmButtonStyle}
              >
                Confirm
              </Button>
              :
              <Button
                type="submit"
                className={confirmButtonStyle}
              >
                Create
              </Button>
            }
          </div>
        </form>
      </ModalTemplate>
    </>
  )
}

export default UpdatePresentationInfoModal;