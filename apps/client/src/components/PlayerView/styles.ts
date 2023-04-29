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
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 15px;
  z-index: 1;
`;

export const ChipValue = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 14px;
  font-weight: bold;
`;

export const Chip = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  /* transform: rotateX(55deg) rotateZ(-40deg); */
  cursor: pointer;
  backface-visibility: hidden;
  svg {
    filter: drop-shadow(-4px 4px 0px #1a1a1a);
  }
`;

export const PlacedBetChip = styled.div`
  position: absolute;
  border-radius: 50%;
  transform: rotateX(50deg);
  width: 100px;
  height: 100px;
  background-color: green;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ActiveChip = styled.div<{ isActive: boolean }>`
  position: relative;
  width: 120px;
  height: 120px;
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
  position: absolute;
  bottom: 10px;
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

  ${(props) => {
    if (props.disabled) {
      return css`
        cursor: not-allowed;
      `;
    }
  }}
`;

export const Balance = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 60px;
  color: #ffffff;
`;

export const Test = styled.div`
  width: 100%;
  max-height: 100vh;
  position: relative;
`;
