import { webSocketClient } from "../../webSocket";
import { useAppSelector } from "../../redux/store";
import * as Styled from "./styles";

export const EvaluateHandsButton = () => {
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);

  const checkResult = () => {
    webSocketClient.emit("MESSAGE", {
      type: "EVALUATE_HANDS",
      payload: {
        roundId: round?.id,
        playerId: game?.player_id,
      },
    });
  };

  const numberCardsPlayed = round
    ? round?.dealer_cards?.length +
      round?.player_cards?.length +
      round?.common_cards.length
    : 0;

  const isActive =
    game &&
    round &&
    round?.bets_over &&
    numberCardsPlayed === 9 &&
    round?.play_bet &&
    !round.round_over;

  return (
    <div>
      <Styled.SidebarButton disabled={!isActive} onClick={checkResult}>
        Evaluate Hands
      </Styled.SidebarButton>
    </div>
  );
};
