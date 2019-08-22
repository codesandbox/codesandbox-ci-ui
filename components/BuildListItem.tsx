import styled from "styled-components";
import { colors } from "../theme/colors";

export const BuildListItem = styled.a<{ i: number }>`
  transition: 0.3s ease background-color;
  display: flex;
  align-items: center;
  height: 2rem;

  text-decoration: none;
  color: white;

  padding: 0.5rem 1rem;

  background-color: ${props => (props.i % 2 === 1 ? colors.bg2 : colors.bg1)};
  cursor: pointer;

  &:hover {
    background-color: #111111;
  }
`;
