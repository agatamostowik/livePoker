import styled, { css } from "styled-components";
import { Button } from "../Button";

export const Container = styled.div`
  align-items: center;
  background-color: #000000;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
`;

export const Wrapper = styled.div`
  max-height: 100vh;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #181615;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// export const Button = styled.button`
//   position: absolute;
//   top: 0;
//   right: 0;
// `;

export const H1 = styled.h1`
  position: absolute;
  top: 0;
`;

export const Game = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Video = styled.video`
  width: 100%;
  max-height: 100vh;
`;

export const Board = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const JoinGameButton = styled(Button)`
  width: 150px;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
`;

export const ChipsContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const PlayOrPassContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  width: 25%;
  height: 100%;
  align-items: center;
  gap: 15px;
  z-index: 1;
`;

export const PlayOrPassButton = styled.button<{ primary?: boolean }>`
  background-color: ${(props) => (props.primary ? "#0b8b46" : "#e84040")};
  padding: 11px;
  width: 100%;
  font-size: 15px;
  border-radius: 5px;
  border-style: none;
  color: rgb(214, 216, 216);
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? "#3ba26a" : "#ec6666")};
  }
`;

export const PlayOrPassButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
`;

export const Title = styled.div`
  color: #ffffff;
  font-size: 22px;
`;

export const ChipValue = styled.div`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

export const Chip = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  /* transform: rotateX(55deg) rotateZ(-40deg); */
  cursor: pointer;
  backface-visibility: hidden;
  /* svg {
    filter: drop-shadow(-4px 4px 0px #1a1a1a);
  } */
`;

export const ActiveChip = styled.div<{ isActive: boolean }>`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => {
    if (props.isActive) {
      return css`
        background: radial-gradient(farthest-side, #ffd700, transparent);
      `;
    }
  }}
`;

export const Buttons = styled.div`
  display: flex;
  gap: 20px;
  z-index: 1;
`;

export const Tray = styled.div<{ disabled?: boolean }>`
  border: 1px solid #ffffff;
  border-radius: 10px;
  width: 200px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 30px;
  cursor: pointer;
  background-color: rgba(23, 22, 20, 0.3);

  ${(props) => {
    if (props.disabled) {
      return css`
        cursor: not-allowed;
      `;
    }
  }}
`;

export const Balance = styled.div<{ as?: "button" }>`
  background-color: rgba(23, 22, 20, 0.3);
  border-radius: 10px;
  border: 1px solid #ffffff;
  color: #ffffff;
  font-size: 16px;
  padding: 10px 20px;
  ${(props) => {
    if (props.as === "button") {
      return css`
        cursor: pointer;
      `;
    }
  }}
`;

export const Test = styled.div`
  width: 100%;
  max-height: 100vh;
  position: relative;
`;

export const Info = styled.div`
  position: absolute;
  right: 25px;
  top: 50px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  z-index: 3;
`;

export const Layer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin: 10px;
  gap: 20px;
`;
