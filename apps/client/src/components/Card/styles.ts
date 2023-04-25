import styled, { css } from "styled-components";

export type Color = "spades" | "clubs" | "hearts" | "diamonds";

export type Rank =
  | "rank1"
  | "rank2"
  | "rank3"
  | "rank4"
  | "rank5"
  | "rank6"
  | "rank7"
  | "rank8"
  | "rank9"
  | "rank10"
  | "rank11"
  | "rank12"
  | "rank13";

type CardProps = {
  face?: boolean;
  back?: boolean;
  color?: Color;
  rank?: Rank;
};

const values = {
  rank1: "A",
  rank2: "2",
  rank3: "3",
  rank4: "4",
  rank5: "5",
  rank6: "6",
  rank7: "7",
  rank8: "8",
  rank9: "9",
  rank10: "10",
  rank11: "J",
  rank12: "Q",
  rank13: "K",
};

const urls = {
  spades: {
    rank1: new URL(`/src/assets/spades_rank1.svg`, import.meta.url).href,
    rank2: new URL(`/src/assets/spades_rank2.svg`, import.meta.url).href,
    rank3: new URL(`/src/assets/spades_rank3.svg`, import.meta.url).href,
    rank4: new URL(`/src/assets/spades_rank4.svg`, import.meta.url).href,
    rank5: new URL(`/src/assets/spades_rank5.svg`, import.meta.url).href,
    rank6: new URL(`/src/assets/spades_rank6.svg`, import.meta.url).href,
    rank7: new URL(`/src/assets/spades_rank7.svg`, import.meta.url).href,
    rank8: new URL(`/src/assets/spades_rank8.svg`, import.meta.url).href,
    rank9: new URL(`/src/assets/spades_rank9.svg`, import.meta.url).href,
    rank10: new URL(`/src/assets/spades_rank10.svg`, import.meta.url).href,
    rank11: new URL(`/src/assets/spades_rank11.svg`, import.meta.url).href,
    rank12: new URL(`/src/assets/spades_rank12.svg`, import.meta.url).href,
    rank13: new URL(`/src/assets/spades_rank13.svg`, import.meta.url).href,
  },
  hearts: {
    rank1: new URL(`/src/assets/hearts_rank1.svg`, import.meta.url).href,
    rank2: new URL(`/src/assets/hearts_rank2.svg`, import.meta.url).href,
    rank3: new URL(`/src/assets/hearts_rank3.svg`, import.meta.url).href,
    rank4: new URL(`/src/assets/hearts_rank4.svg`, import.meta.url).href,
    rank5: new URL(`/src/assets/hearts_rank5.svg`, import.meta.url).href,
    rank6: new URL(`/src/assets/hearts_rank6.svg`, import.meta.url).href,
    rank7: new URL(`/src/assets/hearts_rank7.svg`, import.meta.url).href,
    rank8: new URL(`/src/assets/hearts_rank8.svg`, import.meta.url).href,
    rank9: new URL(`/src/assets/hearts_rank9.svg`, import.meta.url).href,
    rank10: new URL(`/src/assets/hearts_rank10.svg`, import.meta.url).href,
    rank11: new URL(`/src/assets/hearts_rank11.svg`, import.meta.url).href,
    rank12: new URL(`/src/assets/hearts_rank12.svg`, import.meta.url).href,
    rank13: new URL(`/src/assets/hearts_rank13.svg`, import.meta.url).href,
  },
  clubs: {
    rank1: new URL(`/src/assets/clubs_rank1.svg`, import.meta.url).href,
    rank2: new URL(`/src/assets/clubs_rank2.svg`, import.meta.url).href,
    rank3: new URL(`/src/assets/clubs_rank3.svg`, import.meta.url).href,
    rank4: new URL(`/src/assets/clubs_rank4.svg`, import.meta.url).href,
    rank5: new URL(`/src/assets/clubs_rank5.svg`, import.meta.url).href,
    rank6: new URL(`/src/assets/clubs_rank6.svg`, import.meta.url).href,
    rank7: new URL(`/src/assets/clubs_rank7.svg`, import.meta.url).href,
    rank8: new URL(`/src/assets/clubs_rank8.svg`, import.meta.url).href,
    rank9: new URL(`/src/assets/clubs_rank9.svg`, import.meta.url).href,
    rank10: new URL(`/src/assets/clubs_rank10.svg`, import.meta.url).href,
    rank11: new URL(`/src/assets/clubs_rank11.svg`, import.meta.url).href,
    rank12: new URL(`/src/assets/clubs_rank12.svg`, import.meta.url).href,
    rank13: new URL(`/src/assets/clubs_rank13.svg`, import.meta.url).href,
  },
  diamonds: {
    rank1: new URL(`/src/assets/diamonds_rank1.svg`, import.meta.url).href,
    rank2: new URL(`/src/assets/diamonds_rank2.svg`, import.meta.url).href,
    rank3: new URL(`/src/assets/diamonds_rank3.svg`, import.meta.url).href,
    rank4: new URL(`/src/assets/diamonds_rank4.svg`, import.meta.url).href,
    rank5: new URL(`/src/assets/diamonds_rank5.svg`, import.meta.url).href,
    rank6: new URL(`/src/assets/diamonds_rank6.svg`, import.meta.url).href,
    rank7: new URL(`/src/assets/diamonds_rank7.svg`, import.meta.url).href,
    rank8: new URL(`/src/assets/diamonds_rank8.svg`, import.meta.url).href,
    rank9: new URL(`/src/assets/diamonds_rank9.svg`, import.meta.url).href,
    rank10: new URL(`/src/assets/diamonds_rank10.svg`, import.meta.url).href,
    rank11: new URL(`/src/assets/diamonds_rank11.svg`, import.meta.url).href,
    rank12: new URL(`/src/assets/diamonds_rank12.svg`, import.meta.url).href,
    rank13: new URL(`/src/assets/diamonds_rank13.svg`, import.meta.url).href,
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
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  ${(props) => {
    if (props.back) {
      return css`
        background-image: ${`url("${
          new URL(`/src/assets/back.png`, import.meta.url).href
        }")`};
        background-position: 50% 50%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      `;
    }
  }}

  ${(props) => {
    if (props.face) {
      return css`
        background-position: 50% 50%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      `;
    }
  }}

  ${(props) => {
    if ((props.face && props.color === "spades") || props.color === "clubs") {
      return css`
        color: #000;
      `;
    }
  }}

  ${(props) => {
    if (
      (props.face && props.color === "hearts") ||
      props.color === "diamonds"
    ) {
      return css`
        color: #d40000;
      `;
    }
  }}

  ${(props) => {
    if (props.face && props.color && props.rank) {
      return css`
        background-image: url(${urls[props.color][props.rank]});
        background-size: contain;
      `;
    }
  }}
  
  ${(props) => {
    if (props.face && props.rank) {
      return css`
        &:after,
        &:before {
          content: "${(props) => {
            return `${values[props.rank]}`;
          }}";
        }
      `;
    }
  }}
`;
