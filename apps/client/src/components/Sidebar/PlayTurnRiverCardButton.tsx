import _ from "lodash";
import { webSocketClient } from "../../webSocket";
import { useAppSelector } from "../../redux/store";
import * as Styled from "./styles";

export const PlayTurnRiverCardButton = () => {
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);

  const handleClick = () => {
    webSocketClient.emit("MESSAGE", {
      type: "PLAY_TURN_RIVER_CARDS",
      payload: {
        roundId: round?.id,
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
    numberCardsPlayed === 7 &&
    round?.play_bet;

  return (
    <div>
      <Styled.SidebarButton disabled={!isActive} onClick={handleClick}>
        Play Turn and River cards
      </Styled.SidebarButton>
    </div>
  );
};
