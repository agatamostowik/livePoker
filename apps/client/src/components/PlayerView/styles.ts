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
  z-index: 2;
`;

export const H1 = styled.h1`
  position: absolute;
  top: 0;
  z-index: 0;
`;

export const Game = styled.div`
  position: absolute;
  z-index: 1;
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
`;

export const Chip = styled.button`
  background-color: green;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 5px;
`;

export const Buttons = styled.div``;

export const AAButton = styled.div``;

export const AnteButton = styled.div`
  border: 5px solid #ffffff;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  transform: rotateX(50deg);
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
