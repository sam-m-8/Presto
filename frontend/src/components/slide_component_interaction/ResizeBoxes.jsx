import styled from 'styled-components';
import { useRef } from 'react';

const StyledResizeBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected"
})`
  position: absolute;
  width: 11px;
  height: 11px;
  background-color: #4f46e5;
  display: ${props => (props.isSelected ? 'block' : 'none')};
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  bottom: ${props => props.bottom}px;
  right: ${props => props.right}px;
  border-radius: 2px;
  cursor: ${props => props.cursor};
`;

const ResizeBoxes = ({
  parentRef, isSelected, resizeMoveUpdate, resizeEndUpdate,
  boxWidth, boxHeight, positionLeft, positionTop
}) => {
  const resizeDirection = useRef(null);

  const leftRef = useRef(positionLeft);
  const topRef = useRef(positionTop);
  const widthRef = useRef(boxWidth);
  const heightRef = useRef(boxHeight);

  const handleResizeStart = (e, direction) => {
    e.stopPropagation();
    e.preventDefault();
    resizeDirection.current = direction;
    document.addEventListener("mousemove", handleResizeMove);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const handleResizeMove = (e) => {
    e.preventDefault();
    if (!parentRef.current) return;

    // RequestAnimationFrame used to stop error where max update limit is
    // reached, by only allowing update on next animation frame
    requestAnimationFrame(() => {
      if (!resizeDirection.current) return;

      // parent rect is the slide card dimensions and position
      const parentRect = parentRef.current.getBoundingClientRect();
      let newWidth = boxWidth;
      let newHeight = boxHeight;
      let newLeft = positionLeft;
      let newTop = positionTop;

      // Given the current corner box selected, adjust the components
      // width, height, top and left
      if (resizeDirection.current.includes("right")) {
        newWidth = ((e.clientX - parentRect.left) / parentRect.width) * 100 - positionLeft;
      }
      if (resizeDirection.current.includes("bottom")) {
        newHeight = ((e.clientY - parentRect.top) / parentRect.height) * 100 - positionTop;
      }
      if (resizeDirection.current.includes("left")) {
        newWidth = boxWidth + (positionLeft - ((e.clientX - parentRect.left) / parentRect.width) * 100);
        newLeft = ((e.clientX - parentRect.left) / parentRect.width) * 100;
      }
      if (resizeDirection.current.includes("top")) {
        newHeight = boxHeight + (positionTop - ((e.clientY - parentRect.top) / parentRect.height) * 100);
        newTop = ((e.clientY - parentRect.top) / parentRect.height) * 100;
      }

      // Ensures that the top and left stay inside card
      newLeft = Math.max(0, Math.min(newLeft, 100 - (boxWidth / parentRect.width) * 100));
      newTop = Math.max(0, Math.min(newTop, 100 - (boxWidth / parentRect.height) * 100));

      // Ensure width and height stay inside card
      if (newWidth + newLeft > 100) {
        newWidth = 100 - newLeft;
      }
      if (newHeight + newTop > 100) {
        newHeight = 100 - newTop;
      }

      widthRef.current = Math.max(newWidth, 1);
      heightRef.current = Math.max(newHeight, 1);
      leftRef.current = newLeft;
      topRef.current = newTop;
      resizeMoveUpdate(widthRef.current, heightRef.current, newLeft, newTop);
    });
  };

  const handleResizeEnd = () => {
    document.removeEventListener("mousemove", handleResizeMove);
    document.removeEventListener("mouseup", handleResizeEnd);

    resizeDirection.current = null;
    resizeEndUpdate();
  };

  return (
    <>
      <StyledResizeBox
        isSelected={isSelected}
        top={null}
        left={null}
        bottom={-1}
        right={-1}
        cursor="nw-resize"
        onMouseDown={(e) => handleResizeStart(e, "bottom-right")}
      />

      <StyledResizeBox
        isSelected={isSelected}
        top={null}
        left={-1}
        bottom={-1}
        right={null}
        cursor="ne-resize"
        onMouseDown={(e) => handleResizeStart(e, "bottom-left")}
      />

      <StyledResizeBox
        isSelected={isSelected}
        top={-1}
        left={-1}
        bottom={null}
        right={null}
        cursor="se-resize"
        onMouseDown={(e) => handleResizeStart(e, "top-left")}
      />

      <StyledResizeBox
        isSelected={isSelected}
        top={-1}
        left={null}
        bottom={null}
        right={-1}
        cursor="sw-resize"
        onMouseDown={(e) => handleResizeStart(e, "top-right")}
      />
    </>
  );
};

export default ResizeBoxes;