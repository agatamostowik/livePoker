import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  background-color: #181615;
  color: white;
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

export const Game = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`;

export const Board = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;
`;

export const Buttons = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
  gap: 20px;
`;

export const Button = styled.div`
  align-items: center;
  border-radius: 10px;
  border: 1px solid #ffffff;
  color: #ffffff;
  cursor: default;
  display: flex;
  font-size: 30px;
  height: 80px;
  justify-content: center;
  width: 200px;
`;

export const PlacedBetChip = styled.div`
  align-items: center;
  background-color: green;
  border-radius: 50%;
  color: white;
  display: flex;
  height: 100px;
  justify-content: center;
  position: absolute;
  transform: rotateX(50deg);
  width: 100px;
`;
