import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  transition: opacity 0.5s, height 0.25s;
  opacity: 1;
  &.disable{
    opacity: 0;
    height: 0%;
  }
`;

export const Spinner = styled.div`
  figure{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    img {
      width: 30%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    svg {
      stroke-dasharray: 180;
      stroke-dashoffset: 0;
      width: 4.5rem;
      circle {
        stroke-width: 0.75rem;
        stroke: lightgray;
        stroke-linecap: round;
        fill: transparent;
        transform-origin: 50% 50%;
        animation: ${rotateAnimation} 1s ease-in infinite;
      }
    }
    figcaption {
      font-weight: bold;
      font-size: 0.8rem;
      letter-spacing: 0.5rem;
      text-align: center;
      color: lightgray;
    }
  }

`;