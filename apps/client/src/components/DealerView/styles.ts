import styled from "styled-components";

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
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const StartBetting = styled.button`
  padding: 10px 20px;
  background-color: pink;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Board = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const Aside = styled.div`
  background-color: yellow;
  height: 100%;
  width: 300px;
  position: absolute;
  left: 0;
  z-index: 2;
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

export const PlayButton = styled.div`
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

export const Phase = styled.div<{ success?: boolean }>``;
