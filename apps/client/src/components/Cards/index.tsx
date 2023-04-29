import { useAppSelector } from "../../redux/store";
import { Card } from "../Card";
import { Color, Rank } from "../Card/styles";
import * as Styled from "./styles";

export const Cards = () => {
  const round = useAppSelector((state) => state.round.data);

  return (
    <Styled.Container>
      <Styled.Cards>
        {round?.dealer_cards.map((card, index) => {
          const colorRank = card.split("_");
          const rank = colorRank[0] as Rank;
          const color = colorRank[1] as Color;

          return <Card key={index} color={color} rank={rank} />;
        })}
      </Styled.Cards>
      <Styled.Cards>
        {round?.common_cards.map((card, index) => {
          const colorRank = card.split("_");
          const rank = colorRank[0] as Rank;
          const color = colorRank[1] as Color;

          return <Card key={index} color={color} rank={rank} />;
        })}
      </Styled.Cards>
      <Styled.Cards>
        {round?.player_cards.map((card, index) => {
          const colorRank = card.split("_");
          const rank = colorRank[0] as Rank;
          const color = colorRank[1] as Color;

          return <Card key={index} color={color} rank={rank} />;
        })}
      </Styled.Cards>
    </Styled.Container>
  );
};
