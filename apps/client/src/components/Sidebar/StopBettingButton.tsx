import { webSocketClient } from "../../webSocket";
import { useAppSelector } from "../../redux/store";
import * as Styled from "./styles";

export const StopBettingButton = () => {
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);

  const handleStopBetting = () => {
    webSocketClient.emit("MESSAGE", {
      type: "STOP_BETS",
      payload: {
        roundId: round?.id,
        playerId: game?.player_id,
        gameId: game?.id,
      },
    });
  };

  const isActive = game && round && !round?.bets_over;

  return (
    <div>
      <Styled.SidebarButton disabled={!isActive} onClick={handleStopBetting}>
        Stop accepting bets
      </Styled.SidebarButton>
    </div>
  );
};
