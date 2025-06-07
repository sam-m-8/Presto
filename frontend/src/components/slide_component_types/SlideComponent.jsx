import SlideTextComponent from "./SlideTextComponent";
import SlideImageComponent from "./SlideImageComponent";
import SlideVideoComponent from "./SlideVideoComponent";
import SlideCodeComponent from "./SlideCodeComponent";

const SlideComponent = (props) => {
  
  switch(props.type) {
  case "text":
    return (
      <SlideTextComponent
        content={props.content}
        fontColour={props.fontColour}
        fontSize={props.fontSize}
        fontFamily={props.fontFamily}
        height={props.height}
        width={props.width}
        componentIndex={props.componentIndex}
        isPresentMode={props.isPresentMode}
      />
    );

  case "image":
    return (
      <SlideImageComponent
        url={props.url}
        alt={props.alt}
        height={props.height}
        width={props.width}
        componentIndex={props.componentIndex}
        isPresentMode={props.isPresentMode}
      />
    );

  case "video":
    return (
      <SlideVideoComponent
        url={props.url}
        autoplay={props.autoplay}
        height={props.height}
        width={props.width}
        componentIndex={props.componentIndex}
        isPresentMode={props.isPresentMode}
      />
    );

  case "code":
    return (
      <SlideCodeComponent
        content={props.content}
        fontSize={props.fontSize}
        height={props.height}
        width={props.width}
        componentIndex={props.componentIndex}
        isPresentMode={props.isPresentMode}
      />
    );
  }

}

export default SlideComponent;