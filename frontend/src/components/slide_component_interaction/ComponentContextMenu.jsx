import { useEffect } from 'react';
import styled from "styled-components";
import DeleteComponentButton from './DeleteComponentButton';
import DuplicateComponentButton from './DuplicateComponentButton';

const StyledComponentMenu = styled.div`
  position: fixed;
  top: ${props => props.$top}px;
  left: ${props => props.$left}px;
`;

const ComponentContextMenu = ({ isMenuOpen, top, left, closeContextMenu, componentIndex }) => {
  const menuStyle = "z-10 inline-block w-32 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-lg opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 transition-opacity duration-300"

  const handleCloseMenu = () => {
    closeContextMenu();
  };

  // handle isMenuState change by closing menu if state is set to false
  useEffect(() => {
    if (!isMenuOpen) {
      handleCloseMenu();
    }
  }, [isMenuOpen]);

  return (
    <>
      {isMenuOpen && (
        <StyledComponentMenu
          $left={left}
          $top={top}
          className={menuStyle}
        >
          <DuplicateComponentButton
            componentIndex={componentIndex}
          />
          <DeleteComponentButton
            componentIndex={componentIndex}
          />
        </StyledComponentMenu>
      )}
    </>
  );
}

export default ComponentContextMenu;