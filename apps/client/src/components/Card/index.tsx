import { useEffect, useState } from "react";
import { Color, Rank } from "./styles";
import * as Styled from "./styles";

// https://codepen.io/jasonchan/full/vLeqyB
export const Card = (props: {
  color: Color;
  rank: Rank;
  canBeVisible?: boolean;
}) => {
  const { color, rank, canBeVisible = true } = props;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (canBeVisible) {
      setIsVisible(true);
    }
  }, [canBeVisible]);

  return (
    <Styled.Container>
      <Styled.Wrapper isVisible={isVisible}>
        <Styled.Card side="back" />
        <Styled.Card side="face" color={color} rank={rank} />
      </Styled.Wrapper>
    </Styled.Container>
  );
};
