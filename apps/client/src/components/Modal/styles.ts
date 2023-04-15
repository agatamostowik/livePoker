import styled from "styled-components";

export const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
`;

export const Dialog = styled.div`
  background-color: #ffffff;
  position: relative;
  padding: 3rem;
  z-index: 2;
  max-width: 90%;
  border-radius: 20px;
  overflow: scroll;
  z-index: 3;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const X = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;
