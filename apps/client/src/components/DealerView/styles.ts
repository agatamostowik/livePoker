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
