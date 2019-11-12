import styled from "styled-components";

export const Title = styled.h1`
  font-size: 19px;
  font-weight: 300;
  margin-bottom: 0;
`;

export const Description = styled.p`
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 0;
  max-width: 600px;
  text-align: center;
  line-height: 1.6;
`;

export const SubTitle = styled.h2`
  font-size: 16px;
  font-weight: 300;
  color: #ccc;
`;

export const ButtonContainer = styled.div`
  width: 20rem;
  margin-top: 1.5rem;
  text-align: center;
`;

export const Link = styled.a`
  transition: 0.3s ease color;
  display: block;
  margin-top: 1.5rem;
  font-size: 1rem;
  font-weight: 300;
  color: #ccc !important;

  &:hover {
    color: white !important;
  }
`;

export const Button = styled.a`
  transition: 0.3s ease background-color;

  background-color: #0a84ff;
  border-radius: 4px;
  border: 0;
  padding: 0.5rem 2rem;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;

  color: white;

  &:hover {
    background-color: #0971f1;
  }
`;
