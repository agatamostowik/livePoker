import styled from "styled-components";
import { Button } from "../Button";

export const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 350px;
  left: 0px;
  z-index: 3;
`;

export const Wrapper = styled.div`
  max-height: 100vh;
  position: relative;
  width: 100%;
`;

export const SidebarButton = styled(Button)`
  &:disabled {
    opacity: 0.5;
    background-color: #838282;
    cursor: not-allowed;
    &:hover {
      background-color: #838282;
    }
  }
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  padding: 10px;
`;

export const Phase = styled.div<{ success?: boolean }>`
  color: ${(props) => (props.success ? "#2DBE5B" : "#FFFFFF")};
  display: flex;
  font-size: 14px;
`;

export const Buttons = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
  gap: 20px;
`;

export const AAButton = styled.div`
  cursor: pointer;
  border: 1px solid #ffffff;
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
  border: 1px solid #ffffff;
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
  border: 1px solid #ffffff;
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
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const On = styled.div`
  color: #2dbe5b;
  font-weight: bold;
  margin-left: 10px;
`;

export const Off = styled.div`
  color: #be2d30;
  font-weight: bold;
  margin-left: 10px;
`;
