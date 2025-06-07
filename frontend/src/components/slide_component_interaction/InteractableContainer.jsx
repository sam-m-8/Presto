import styled from "styled-components";
import { useState } from "react";
import ResizeBoxes from "./ResizeBoxes";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { Context, useContext } from "../../context";
import ComponentContextMenu from "./ComponentContextMenu";
import useUpdateArchive from "../../useUpdateArchive";

const StyledInteractableContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected"
}).attrs((props) => ({
  style: {
    top: `${props.top}%`,
    left: `${props.left}%`,
    width: `${props.width}%`,
    height: `${props.height}%`,
  },
}))`
  position: absolute;
  border: ${(props) => (props.isSelected ? "2px solid #4f46e5" : "2px solid #e2e8f0")};
  box-sizing: border-box;
  cursor: ${(props) => (props.isSelected ? "move" : "pointer")};

  &:hover {
    border-color: #4f46e5;
  }
`;

const InteractableContainer = ({ children, width, height, left, top, parentRef, componentIndex }) => {
  const [isSelected, setIsSelected] = useState(false);
  const boxRef = useRef(null);
  const { id, slideNum } = useParams();
  const { getters, setters } = useContext(Context);
  const updateArchive = useUpdateArchive();

  const [positionLeft, setPositionLeft] = useState(left);
  const [positionTop, setPositionTop] = useState(top);
  const [boxWidth, setBoxWidth] = useState(Number(width));
  const [boxHeight, setBoxHeight] = useState(Number(height));

  const leftRef = useRef(left);
  const topRef = useRef(top);
  const widthRef = useRef(Number(width));
  const heightRef = useRef(Number(height));

  const offsetX = useRef(0);
  const offsetY = useRef(0);

  const selectComponent = () => setIsSelected(true);

  const deselectComponent = () => setIsSelected(false);

  // Given left, top and optionally width and height properties, updates
  // current components store with given values
  const updateStore = (newLeft, newTop, newWidth = null, newHeight = null) => {
    const slideIndex = slideNum - 1;
    const focusSlide = getters.presentations[id].slides[slideIndex];

    // Update top and left in current slide's components
    const updatedSlide = {
      ...focusSlide,
      components: {
        ...focusSlide.components,
        [componentIndex]: {
          ...focusSlide.components[componentIndex],
          left: newLeft,
          top: newTop,
          width: newWidth ? newWidth : focusSlide.components[componentIndex].width,
          height: newHeight ? newHeight : focusSlide.components[componentIndex].height,
        },
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
  }

  // When mouse key pressed down after already selected, initiate component
  // move procedure, adding relevant event listeners
  const handleMouseDown = (e) => {
    if (!isSelected) return;

    // Calculates where mouse was clicked inside the component
    const boxRect = boxRef.current.getBoundingClientRect();
    offsetX.current = e.clientX - boxRect.left;
    offsetY.current = e.clientY - boxRect.top;

    // Added to ensure the move is still valid even if the cursor leaves the
    // component and can cancel move by releasing mouse anywhere not just
    // on component
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // When clicked and dragged, handles the updating of the component's position.
  const handleMouseMove = (e) => {
    if (!parentRef.current) return;

    // Animation frame used so the max number of updates isn't exceeded
    requestAnimationFrame(() => {
      const parentRect = parentRef.current.getBoundingClientRect();
      const boxRect = boxRef.current.getBoundingClientRect();

      // Calculates top and left percent ie what the selected box's
      // top left corner is
      let newLeftPercent = ((e.clientX - parentRect.left - offsetX.current) / parentRect.width) * 100;
      let newTopPercent = ((e.clientY - parentRect.top - offsetY.current) / parentRect.height) * 100;

      // If dragged out of bounds, it will set the top/left to the max/min position
      newLeftPercent = Math.max(0, Math.min(newLeftPercent, 100 - (boxRect.width / parentRect.width) * 100));
      newTopPercent = Math.max(0, Math.min(newTopPercent, 100 - (boxRect.height / parentRect.height) * 100));

      setPositionLeft(newLeftPercent);
      setPositionTop(newTopPercent);
      leftRef.current = newLeftPercent;
      topRef.current = newTopPercent;
    });
  };

  // On release of mouse after drag, removes event listeners and
  // stores component's new position
  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    updateStore(leftRef.current, topRef.current);
  };

  // Given the position and size of the component during resize, udpates
  // current variables to reflect change
  const resizeMoveUpdate = (newWidth, newHeight, newLeft, newTop) => {
    setBoxWidth(newWidth);
    setBoxHeight(newHeight);
    setPositionLeft(newLeft);
    setPositionTop(newTop);
    leftRef.current = newLeft;
    topRef.current = newTop;
    widthRef.current = newWidth;
    heightRef.current = newHeight;
  };

  // Stores refs to the size and position as useState does not update the
  // variables in time for the store update
  const resizeEndUpdate = () => {
    updateStore(leftRef.current, topRef.current, widthRef.current, heightRef.current);
  }


  const [menuX, setMenuX] = useState(null);
  const [menuY, setMenuY] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // If component is right clicked, open the context menu component
  const openContextMenu = (e) => {
    e.preventDefault();
    if (isMenuOpen) return;
    setMenuX(e.clientX);
    setMenuY(e.clientY);
    setIsMenuOpen(true);

    // Event listener needed to listen for click anywhere on screen
    // in order to close the menu
    document.addEventListener("click", closeContextMenu);
  };

  const closeContextMenu = () => {
    setIsMenuOpen(false);
    setIsSelected(false);
    document.removeEventListener("click", closeContextMenu);
  }

  return (
    <>
      <StyledInteractableContainer
        name="interactable-container"
        ref={boxRef}
        isSelected={isSelected}
        tabIndex="0"
        onClick={selectComponent}
        onBlur={deselectComponent}
        onMouseDown={handleMouseDown}
        width={boxWidth}
        height={boxHeight}
        left={positionLeft}
        top={positionTop}
        onContextMenu={openContextMenu}
      >
        {children}

        <ResizeBoxes
          isSelected={isSelected}
          boxWidth={boxWidth}
          boxHeight={boxHeight}
          positionLeft={positionLeft}
          positionTop={positionTop}
          resizeMoveUpdate={resizeMoveUpdate}
          resizeEndUpdate={resizeEndUpdate}
          parentRef={parentRef}
        />

        <ComponentContextMenu
          isMenuOpen={isMenuOpen}
          top={menuY}
          left={menuX}
          closeContextMenu={closeContextMenu}
          componentIndex={componentIndex}
        />
      </StyledInteractableContainer>
    </>
  );
}

export default InteractableContainer;