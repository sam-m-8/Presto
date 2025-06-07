import { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from '../../context';
import SlideComponent from "../slide_component_types/SlideComponent";
import InteractableContainer from "../slide_component_interaction/InteractableContainer";
import styled, { keyframes } from 'styled-components';
import PresentComponentContainer from "../slide_features/PresentComponentContainer";

// fade transition styling
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// fade transition div wrapper 
const FadeInWrapper = styled.div`
  animation: ${fadeIn} 2s ease-in-out;
`;

const SlideCard = ({ isPresentMode = false, }) => {
  const { id, slideNum } = useParams();
  const { getters } = useContext(Context);

  const presentation = getters.presentations[id];
  const slide = presentation.slides[slideNum - 1];
  const componentsArr = Object.entries(slide.components)
  const transition = presentation.transition || "none";

  const cardStyle = slide.background.includes("url") 
    ? {
      backgroundImage: slide.background.split(" ")[0],
      backgroundSize: slide.background.includes("cover") ? "cover" : "auto",
      backgroundPosition: "center", 
    }
    : { background: slide.background, };
  

  const cardPresentModeStyle = "w-full max-w-[calc(94vh*16/9)] aspect-[16/9] relative"
  const cardEditModeStyle = "w-full md:w-2/3 xl:w-1/2 flex aspect-[16/9] shadow-lg relative";
  const slideNumContainerStyle = "bottom-0 left-0 absolute w-[50px] h-[50px] text-base flex items-center justify-center rounded-tr-lg bg-white/40 text-zinc-700";
  const parentContainerRef = useRef(null);

  const cardTailwindStyle = isPresentMode ? cardPresentModeStyle : cardEditModeStyle;
  
  // if the presentation has fade transition applied, and apply fade wrapper if currently in present mode
  const Card = isPresentMode && transition === "fade" ? FadeInWrapper : "div";

  return (
    <>
      <Card key={`${id}-${slideNum}`} className={cardTailwindStyle} style={cardStyle} ref={parentContainerRef}>
        {isPresentMode
          ? componentsArr.map(([componentKey, component]) => (
            <PresentComponentContainer
              key={componentKey}
              {...component}
            >
              <SlideComponent
                componentIndex={componentKey}
                isPresentMode={isPresentMode}
                {...component}
              />
            </PresentComponentContainer>
          ))
          : componentsArr.map(([componentKey, component]) => (
            <InteractableContainer
              key={componentKey}
              {...component}
              parentRef={parentContainerRef}
              componentIndex={componentKey}
            >
              <SlideComponent
                componentIndex={componentKey}
                isPresentMode={isPresentMode}
                {...component}
              />
            </InteractableContainer>
          ))
        }
        <div className={slideNumContainerStyle}>
          <p>{slideNum}</p>
        </div>
      </Card>
    </>
  );
}

export default SlideCard;