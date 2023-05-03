import _ from "lodash";
import { useAppSelector } from "../../redux/store";
import { Card } from "../Card";
import { Color, Rank } from "../Card/styles";
import * as Styled from "./styles";

export const Cards = () => {
  const round = useAppSelector((state) => state.round.data);

  const dealerCardsCanBeVisible = Boolean(
    round && round?.common_cards.length === 5
  );

  return (
    <Styled.Container>
      {!_.isEmpty(round?.dealer_cards) && (
        <Styled.Wrapper>
          <Styled.Owner>Dealer</Styled.Owner>
          <Styled.Cards>
            {round?.dealer_cards.map((card, index) => {
              const colorRank = card.split("_");
              const rank = colorRank[0] as Rank;
              const color = colorRank[1] as Color;

              return (
                <Card
                  key={index}
                  canBeVisible={dealerCardsCanBeVisible}
                  color={color}
                  rank={rank}
                />
              );
            })}
          </Styled.Cards>
        </Styled.Wrapper>
      )}
      {!_.isEmpty(round?.common_cards) && (
        <Styled.Wrapper>
          <Styled.Cards>
            {round?.common_cards.map((card, index) => {
              const colorRank = card.split("_");
              const rank = colorRank[0] as Rank;
              const color = colorRank[1] as Color;

              return <Card key={index} color={color} rank={rank} />;
            })}
          </Styled.Cards>
        </Styled.Wrapper>
      )}
      {!_.isEmpty(round?.player_cards) && (
        <Styled.Wrapper>
          <Styled.Owner>Player</Styled.Owner>
          <Styled.Cards>
            {round?.player_cards.map((card, index) => {
              const colorRank = card.split("_");
              const rank = colorRank[0] as Rank;
              const color = colorRank[1] as Color;

              return <Card key={index} color={color} rank={rank} />;
            })}
          </Styled.Cards>
        </Styled.Wrapper>
      )}
    </Styled.Container>
  );
};
