import styled, { css } from "styled-components";

export const Container = styled.div`
  perspective: 350px;
`;

export const Wrapper = styled.div<{ isVisible: boolean }>`
  position: relative;
  margin: 0 auto;
  width: 64px;
  height: 90px;
  transition: transform 0.5s ease-in;
  transform-style: preserve-3d;
  transform: rotateY(180deg);

  ${(props) => {
    if (props.isVisible) {
      return css`
        transform: rotateY(0deg);
      `;
    }
  }}
`;

export type Color = "spades" | "clubs" | "hearts" | "diamonds";

export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "T"
  | "J"
  | "Q"
  | "K"
  | "A";

type Side = "face" | "back";

type CardProps = {
  side: Side;
  color?: Color;
  rank?: Rank;
};

const values: Record<string, string> = {
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  T: "10",
  J: "J",
  Q: "Q",
  K: "K",
  A: "A",
};

const urls: Record<string, Record<string, string>> = {
  s: {
    "2": new URL(`/src/assets/2_s.svg`, import.meta.url).href,
    "3": new URL(`/src/assets/3_s.svg`, import.meta.url).href,
    "4": new URL(`/src/assets/4_s.svg`, import.meta.url).href,
    "5": new URL(`/src/assets/5_s.svg`, import.meta.url).href,
    "6": new URL(`/src/assets/6_s.svg`, import.meta.url).href,
    "7": new URL(`/src/assets/7_s.svg`, import.meta.url).href,
    "8": new URL(`/src/assets/8_s.svg`, import.meta.url).href,
    "9": new URL(`/src/assets/9_s.svg`, import.meta.url).href,
    T: new URL(`/src/assets/T_s.svg`, import.meta.url).href,
    J: new URL(`/src/assets/J_s.svg`, import.meta.url).href,
    Q: new URL(`/src/assets/Q_s.svg`, import.meta.url).href,
    K: new URL(`/src/assets/K_s.svg`, import.meta.url).href,
    A: new URL(`/src/assets/A_s.svg`, import.meta.url).href,
  },
  h: {
    "2": new URL(`/src/assets/2_h.svg`, import.meta.url).href,
    "3": new URL(`/src/assets/3_h.svg`, import.meta.url).href,
    "4": new URL(`/src/assets/4_h.svg`, import.meta.url).href,
    "5": new URL(`/src/assets/5_h.svg`, import.meta.url).href,
    "6": new URL(`/src/assets/6_h.svg`, import.meta.url).href,
    "7": new URL(`/src/assets/7_h.svg`, import.meta.url).href,
    "8": new URL(`/src/assets/8_h.svg`, import.meta.url).href,
    "9": new URL(`/src/assets/9_h.svg`, import.meta.url).href,
    T: new URL(`/src/assets/T_h.svg`, import.meta.url).href,
    J: new URL(`/src/assets/J_h.svg`, import.meta.url).href,
    Q: new URL(`/src/assets/Q_h.svg`, import.meta.url).href,
    K: new URL(`/src/assets/K_h.svg`, import.meta.url).href,
    A: new URL(`/src/assets/A_h.svg`, import.meta.url).href,
  },
  c: {
    2: new URL(`/src/assets/2_c.svg`, import.meta.url).href,
    3: new URL(`/src/assets/3_c.svg`, import.meta.url).href,
    4: new URL(`/src/assets/4_c.svg`, import.meta.url).href,
    5: new URL(`/src/assets/5_c.svg`, import.meta.url).href,
    6: new URL(`/src/assets/6_c.svg`, import.meta.url).href,
    7: new URL(`/src/assets/7_c.svg`, import.meta.url).href,
    8: new URL(`/src/assets/8_c.svg`, import.meta.url).href,
    9: new URL(`/src/assets/9_c.svg`, import.meta.url).href,
    T: new URL(`/src/assets/T_c.svg`, import.meta.url).href,
    J: new URL(`/src/assets/J_c.svg`, import.meta.url).href,
    Q: new URL(`/src/assets/Q_c.svg`, import.meta.url).href,
    K: new URL(`/src/assets/K_c.svg`, import.meta.url).href,
    A: new URL(`/src/assets/A_c.svg`, import.meta.url).href,
  },
  d: {
    "2": new URL(`/src/assets/2_d.svg`, import.meta.url).href,
    "3": new URL(`/src/assets/3_d.svg`, import.meta.url).href,
    "4": new URL(`/src/assets/4_d.svg`, import.meta.url).href,
    "5": new URL(`/src/assets/5_d.svg`, import.meta.url).href,
    "6": new URL(`/src/assets/6_d.svg`, import.meta.url).href,
    "7": new URL(`/src/assets/7_d.svg`, import.meta.url).href,
    "8": new URL(`/src/assets/8_d.svg`, import.meta.url).href,
    "9": new URL(`/src/assets/9_d.svg`, import.meta.url).href,
    T: new URL(`/src/assets/T_d.svg`, import.meta.url).href,
    J: new URL(`/src/assets/J_d.svg`, import.meta.url).href,
    Q: new URL(`/src/assets/Q_d.svg`, import.meta.url).href,
    K: new URL(`/src/assets/K_d.svg`, import.meta.url).href,
    A: new URL(`/src/assets/A_d.svg`, import.meta.url).href,
  },
};

export const Card = styled.div<CardProps>`
  display: inline-block;
  width: 64px;
  height: 90px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  will-change: transform;
  position: absolute;
  backface-visibility: hidden;

  &::before,
  &::after {
    position: absolute;
    font-size: 0.7rem;
    text-align: center;
    line-height: 0.7rem;
    font-family: "Ubuntu Condensed", sans-serif;
    white-space: pre-line;
    width: 0.55rem;
    letter-spacing: -0.1rem;
  }

  &::before {
    top: 0.15rem;
    left: 0;
  }

  &:after {
    bottom: 0.1rem;
    right: 0;
    transform: rotate(180deg);
  }

  ${(props) => {
    if (props.side === "back") {
      return css`
        background-image: ${`url("${
          new URL(`/src/assets/back.png`, import.meta.url).href
        }")`};
        background-position: 50% 50%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        transform: rotateY(-180deg);
      `;
    }
  }}

  ${(props) => {
    if (props.side === "face") {
      return css`
        background-position: 50% 50%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      `;
    }
  }}

  ${(props) => {
    if (
      (props.side === "face" && props.color === "spades") ||
      props.color === "clubs"
    ) {
      return css`
        color: #000;
      `;
    }
  }}

  ${(props) => {
    if (
      (props.side === "face" && props.color === "hearts") ||
      props.color === "diamonds"
    ) {
      return css`
        color: #d40000;
      `;
    }
  }}

  ${(props) => {
    if (props.side === "face" && props.color && props.rank) {
      return css`
        background-image: url(${urls[props.color][props.rank]});
        background-size: contain;
      `;
    }
  }}
  
  ${(props) => {
    if (props.side === "face" && props.rank) {
      return css`
        &:after,
        &:before {
          content: "${values[props.rank]}";
        }
      `;
    }
  }}
`;
