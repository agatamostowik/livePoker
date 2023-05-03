import styled from "styled-components";

export const Button = styled.button`
  background-color: #4b24a1;
  padding: 11px;
  width: 100%;
  font-size: 15px;
  border-radius: 5px;
  border-style: none;
  color: rgb(214, 216, 216);
  cursor: pointer;

  &:hover {
    background-color: #523590;
  }

  &:disabled {
    opacity: 0.5;

    &:hover {
      background-color: #4b24a1;
      cursor: not-allowed;
    }
  }
`;
