import { webSocketClient } from "../../webSocket";
import { useAppSelector } from "../../redux/store";
import * as Styled from "./styles";

export const NewRoundButton = () => {
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);

  const handleClick = () => {
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

  const isActive = round && round?.round_over;

  return (
    <Styled.SidebarButton disabled={!isActive} onClick={handleClick}>
      New Round
    </Styled.SidebarButton>
  );
};
