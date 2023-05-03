import _ from "lodash";
import { webSocketClient } from "../../webSocket";
import { useAppSelector } from "../../redux/store";
import * as Styled from "./styles";

export const StartBettingButton = () => {
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);

  const handleStartBetting = () => {
    webSocketClient.emit("MESSAGE", {
      type: "CREATE_ROUND",
      payload: {
        roomId: game?.room_id,
        gameId: game?.id,
        playerId: game?.player_id,
        dealerId: game?.dealer_id,
      },
    });
  };

  const isActive = !_.isNull(game) && _.isNull(round);

  return (
    <div>
      <Styled.SidebarButton disabled={!isActive} onClick={handleStartBetting}>
        Start accepting bets
      </Styled.SidebarButton>
    </div>
  );
};
