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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export const Dialog = styled.div`
  background-color: #181615;
  position: relative;
  padding: 3rem;
  max-width: 90%;
  min-width: 30%;
  border-radius: 10px;
  overflow: scroll;
  z-index: 3;
  color: #f2f3f3;
  border: 1px solid #f2f3f338;
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
