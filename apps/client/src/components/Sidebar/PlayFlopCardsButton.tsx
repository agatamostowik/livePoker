import { webSocketClient } from "../../webSocket";
import { useAppSelector } from "../../redux/store";
import * as Styled from "./styles";

export const PlayFlopCardsButton = () => {
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);

  const playFlopCards = () => {
    webSocketClient.emit("MESSAGE", {
      type: "PLAY_FLOP_CARDS",
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

  const isActive = game && round && round?.bets_over && numberCardsPlayed < 7;

  return (
    <div>
      <Styled.SidebarButton disabled={!isActive} onClick={playFlopCards}>
        Play flop cards
      </Styled.SidebarButton>
    </div>
  );
};
