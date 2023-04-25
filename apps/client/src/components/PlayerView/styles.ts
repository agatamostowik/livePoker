import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

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

export const JoinGameButton = styled.button`
  padding: 20px 30px;
  background-color: pink;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  cursor: pointer;
`;

export const ChipsContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export const Chip = styled.button`
  background-color: green;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
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
  border: 5px solid
    ${(props) => {
      return props.isActive ? "yellow" : "transparent";
    }};
  border-radius: 50%;
`;

export const Buttons = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
  gap: 20px;
`;

export const AAButton = styled.div`
  cursor: pointer;
  border: 5px solid #ffffff;
  border-radius: 10px;
  width: 200px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 30px;
`;

export const AnteButton = styled.div`
  cursor: pointer;
  border: 5px solid #ffffff;
  border-radius: 10px;
  width: 200px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 30px;
`;

export const Test = styled.div`
  width: 100%;
  max-height: 100vh;
  position: relative;
`;

export const Balance = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 60px;
  color: #ffffff;
`;
