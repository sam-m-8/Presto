import NextSlideButton from "../components/slide_editor/NextSlideButton";
import PreviousSlideButton from "../components/slide_editor/PreviousSlideButton";
import SlideCard from "../components/slide_editor/SlideCard";

const PresentationPreviewPage = () => {
  const pageContainerStyle = "h-screen bg-zinc-700 flex flex-col items-center justify-center gap-2";
  const buttonsContainerStyle = "flex gap-10";
  return (
    <div className={pageContainerStyle}>
      <SlideCard isPresentMode={true} />
      <div className={buttonsContainerStyle}>
        <PreviousSlideButton isPresentMode={true}/>
        <NextSlideButton isPresentMode={true}/>
      </div>
    </div>
  );
}

export default PresentationPreviewPage;