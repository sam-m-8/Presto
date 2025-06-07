const DeletePresentationButton = ({openModal}) => {
  const buttonStyle = "text-xs md:text-base w-full mt-3 lg:m-3 lg:w-60 lg:fixed lg:right-0 lg:bottom-0 inline-flex gap-3 justify-center bg-white hover:border-2 hover:border-red-400/50 text-red-400 font-semibold py-2 px-4 rounded";

  return (
    <button className={buttonStyle} onClick={openModal}>
      Delete Presentation
    </button>
  );
}

export default DeletePresentationButton;
