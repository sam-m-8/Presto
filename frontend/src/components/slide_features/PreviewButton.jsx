import { useParams } from "react-router-dom";

const PreviewButton = () => {
  const { id } = useParams();

  // open the presentation in preview mode in a new tab
  const handleClick = () => {
    window.open(`/presentations/${id}/1/present`, "_blank");
  }

  const buttonStyle = "inline-flex gap-2 rounded py-2 px-3 text-white hover:bg-white/20";
  const textStyle = "hidden md:block"
  return (
    <button className={buttonStyle} onClick={handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12.75 4H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7.23l3.99 3.7a.75.75 0 0 1-1.02 1.1L12 18.33 8.26 21.8a.75.75 0 1 1-1.02-1.1l4-3.7H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h7.25V2.75a.75.75 0 1 1 1.5 0V4zM4 5.5a.5.5 0 0 0-.5.5v9c0 .28.22.5.5.5h16a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5H4zM10 8l4.5 2.5L10 13V8z"></path>
      </svg>  
      <p className={textStyle}>Preview</p>
    </button>
  );
}

export default PreviewButton;