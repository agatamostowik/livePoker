import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
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
`;

export const Video = styled.video`
  aspect-ratio: 16 / 9;
  height: 100%;
  transform: scale(-1, 1);
  width: 100%;
`;
