import styled from 'styled-components';

export const Container = styled.div`
  z-index: 1;
  position: absolute;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(2px);
`;
