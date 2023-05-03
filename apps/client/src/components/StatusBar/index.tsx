import { useAppSelector } from "../../redux/store";
import * as Styled from "./styles";

export const StatusBar = () => {
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);

  const numberCardsPlayed = round
    ? round?.dealer_cards?.length +
      round?.player_cards?.length +
      round?.common_cards.length
    : 0;

  const messages =
    game && !round
      ? "Waiting for the dealer to start the round..."
      : game && round && round?.bets_over && numberCardsPlayed < 7
      ? "Waiting for the dealer to play flop cards..."
      : game &&
        round &&
        round?.bets_over &&
        numberCardsPlayed === 7 &&
        round?.play_bet
      ? "Waiting for the dealer to play Turn and River cards..."
      : game &&
        round &&
        round?.bets_over &&
        numberCardsPlayed === 9 &&
        round?.play_bet &&
        !round.round_over
      ? "Waiting for the dealer to evaluate hands..."
      : null;

  if (!messages) {
    return null;
  }

  return <Styled.Container>{messages}</Styled.Container>;
};
