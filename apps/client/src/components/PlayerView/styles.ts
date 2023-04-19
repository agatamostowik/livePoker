import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
`;

export const Floating = styled.div`
  position: absolute;
  background-color: red;
  top: 0;
  left: 0;
`;

export const H1 = styled.h1`
  position: absolute;
  top: 0;
  z-index: 0;
`;

export const Video = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const Game = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* background-color: red; */
  z-index: 2;
`;

export const Board = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const JoinGameButton = styled.button`
  padding: 10px 20px;
  background-color: pink;
  cursor: pointer;
`;
