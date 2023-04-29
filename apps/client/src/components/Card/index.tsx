import { Color, Rank } from "./styles";
import * as Styled from "./styles";

// https://codepen.io/jasonchan/full/vLeqyB
export const Card = (props: { color: Color; rank: Rank }) => {
  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.Card side="back" />
        <Styled.Card side="face" color={props.color} rank={props.rank} />
      </Styled.Wrapper>
    </Styled.Container>
  );
};
