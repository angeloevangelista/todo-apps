import styled, { keyframes } from 'styled-components';

const run = keyframes`
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(200%);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const loadingHeight = 2;

export const RunningBar = styled.div`
  position: relative;

  margin-top: 1rem;

  width: 24rem;
  height: ${loadingHeight}px;

  overflow: hidden;

  background-color: #f2f2f2;
  border-radius: ${loadingHeight}px;

  &::after {
    content: '';
    position: absolute;

    width: 50%;
    height: ${loadingHeight}px;

    border-radius: ${loadingHeight}px;
    background-color: #2f80ed;

    animation: ${run} 1s infinite ease-out 0s;
  }
`;
