import { useState } from "react";
import { Context, useContext } from "../../context";
import { useParams } from "react-router-dom";

const VersionHistoryItem = ({ timestamp }) => {
  const listItemStyle = "py-3 sm:py-4";
  const listItemContainerStyle = "flex items-center";
  const contentContainerStyle = "flex-1 min-w-0 ms-4";
  const contentStyle = "text-md font-medium text-gray-900 truncate";
  const buttonContainerStyle = "inline-flex items-center text-base font-semibold text-gray-900 dark:text-white";
  const buttonStyle = "rounded py-1 px-3 bg-indigo-600 text-white hover:bg-indigo-400";
  const successButtonStyle = "rounded py-1 px-3 bg-white border-2 border-indigo-600 text-indigo-600";

  const { getters, setters } = useContext(Context);
  const { id } = useParams();
  const currPresentation = getters.presentations[id];

  const [isRestored, setIsRestored] = useState(false);

  const dayOfWeek = new Date(Number(timestamp)).toLocaleDateString("en-GB", { weekday: 'long' });
  const formattedDate = new Date(Number(timestamp)).toLocaleDateString("en-GB");
  const formattedTime = new Date(Number(timestamp)).toLocaleTimeString("en-US");
  const timeString = dayOfWeek + ", " + formattedDate + " - " + formattedTime;

  const handleRestore = (e) => {
    e.preventDefault();

    // get the selected version of the presentation and update the presentation to be that
    const restoredSlides = currPresentation.archive[timestamp];
    if (restoredSlides) {
      const updatedPresentation = { ...currPresentation, slides: restoredSlides };
      setters.setPresentations({
        ...getters.presentations,
        [id]: updatedPresentation
      });
    }

    setIsRestored(true);
  }


  return (
    <>
      <li className={listItemStyle}>
        <div className={listItemContainerStyle}>
          <div className={contentContainerStyle}>
            <p className={contentStyle}>
              {timeString}
            </p>
          </div>
          <div className={buttonContainerStyle}>
            {isRestored
              ?
              <button
                className={successButtonStyle}
              >
                Restored
              </button>

              :
              <button
                className={buttonStyle}
                onClick={handleRestore}
              >
                Restore
              </button>
            }
          </div>
        </div>
      </li>
    </>
  );
}

export default VersionHistoryItem;