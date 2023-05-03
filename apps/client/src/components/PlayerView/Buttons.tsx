import _ from "lodash";
import { webSocketClient } from "../../webSocket";
import { useAppSelector } from "../../redux/store";
import { Chip } from "../Chip";
import * as Styled from "./styles";

export const Buttons = () => {
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);
  const account = useAppSelector((state) => state.auth.account);
  const bet = useAppSelector((state) => state.round.bet);

  const AABetSum = _.sum(round?.aa_bet);
  const anteBetSum = _.sum(round?.ante_bet);
  const temporaryBalance = account?.balance! - (AABetSum + anteBetSum);

  const isDisabled =
    round === null ||
    round?.bets_over ||
    bet === null ||
    bet > temporaryBalance;

  const makeAnteBet = () => {
    if (bet) {
      if (!isDisabled) {
        webSocketClient.emit("MESSAGE", {
          type: "ANTE_BET",
          payload: {
            bet,
            roundId: round?.id,
            gameId: game?.id,
          },
        });
      }
    }
  };

  const makeAABet = () => {
    if (bet) {
      if (!isDisabled) {
        webSocketClient.emit("MESSAGE", {
          type: "AA_BET",
          payload: {
            bet,
            roundId: round?.id,
            gameId: game?.id,
          },
        });
      }
    }
  };

  return (
    <Styled.Buttons>
      <Styled.Tray disabled={isDisabled} onClick={makeAABet}>
        AA
        {AABetSum > 0 && (
          <Styled.Chip>
            <Chip value={25} />
            <Styled.ChipValue>{AABetSum}</Styled.ChipValue>
          </Styled.Chip>
        )}
      </Styled.Tray>
      <Styled.Tray disabled={isDisabled} onClick={makeAnteBet}>
        Ante
        {anteBetSum > 0 && (
          <Styled.Chip>
            <Chip value={5} />
            <Styled.ChipValue>{anteBetSum}</Styled.ChipValue>
          </Styled.Chip>
        )}
      </Styled.Tray>
      <Styled.Tray disabled>
        Play
        {round?.play_bet && (
          <Styled.Chip>
            <Chip value={500} />
            <Styled.ChipValue>{round.play_bet}</Styled.ChipValue>
          </Styled.Chip>
        )}
      </Styled.Tray>
    </Styled.Buttons>
  );
};
