import styled from "styled-components";

const StyledPresentComponentContainer = styled.div`
  position: absolute;
  top: ${props => props.$top}%;
  left: ${props => props.$left}%;
  width: ${props => props.width}%;
  height: ${props => props.height}%;
`;

const PresentComponentContainer = ({ children, width, height, left, top }) => {

  return (
    <>
      <StyledPresentComponentContainer
        width={width}
        height={height}
        $left={left}
        $top={top}
      >
        {children}
      </StyledPresentComponentContainer>
    </>
  );
}

export default PresentComponentContainer;