import { useAppSelector } from "../../redux/store";
import { Card, Color, Rank } from "../Card/styles";
import * as Styled from "./styles";

export const Cards = () => {
  const round = useAppSelector((state) => state.app.round);

  return (
    <Styled.Container>
      <Styled.Cards>
        {round?.dealer_cards.map((card) => {
          const colorRank = card.split("_");
          const color = colorRank[0] as Color;
          const rank = colorRank[1] as Rank;

          return <Card back color={color} rank={rank} />;
        })}
      </Styled.Cards>
      <Styled.Cards>
        {round?.common_cards.map((card) => {
          const colorRank = card.split("_");
          const color = colorRank[0] as Color;
          const rank = colorRank[1] as Rank;

          return <Card face color={color} rank={rank} />;
        })}
      </Styled.Cards>
      <Styled.Cards>
        {round?.player_cards.map((card) => {
          const colorRank = card.split("_");
          const color = colorRank[0] as Color;
          const rank = colorRank[1] as Rank;

          return <Card face color={color} rank={rank} />;
        })}
      </Styled.Cards>
    </Styled.Container>
  );
};
