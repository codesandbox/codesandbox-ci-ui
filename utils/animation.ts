import { keyframes, css } from "styled-components";

const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: .5;
  }
`;

export const pulse = css`
  animation: ${pulseKeyframe} 1s ease-out infinite;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-fill-mode: none;
  animation-play-state: running;
`;
