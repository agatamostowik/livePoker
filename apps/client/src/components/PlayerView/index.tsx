import { useMemo } from "react";
import _ from "lodash";
import { webSocketClient } from "../../webSocket";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Cards } from "../Cards";
import { Video } from "../Video";
import { Chip } from "../Chip";
import { setBet } from "../../redux/slices/round";
import { Result } from "../Result";
import { AAPayTable, AntePayTable } from "../PayTable";
import { StatusBar } from "../StatusBar";
import { Buttons } from "./Buttons";
import * as Styled from "./styles";
import { useWebRTC } from "./hooks";

const Bet = (props: { disabled: boolean; value: number }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (props.disabled) {
      return;
    }
    dispatch(setBet(props.value));
  };

  return (
    <Styled.Chip onClick={handleClick}>
      <Chip value={props.value} />
      <Styled.ChipValue>{props.value}</Styled.ChipValue>
    </Styled.Chip>
  );
};

const Bets = () => {
  const round = useAppSelector((state) => state.round.data);
  const account = useAppSelector((state) => state.auth.account);
  const bet = useAppSelector((state) => state.round.bet);

  const AABetSum = _.sum(round?.aa_bet);
  const anteBetSum = _.sum(round?.ante_bet);
  const temporaryBalance = account?.balance! - (AABetSum + anteBetSum);

  return (
    <Styled.ChipsContainer>
      {[0.5, 1, 5, 25, 100, 500].map((value) => {
        const isActive = value === bet;
        const isDisabled = value > temporaryBalance;

        return (
          <Styled.ActiveChip
            key={value}
            isActive={!isDisabled ? isActive : false}
          >
            <Bet disabled={isDisabled} value={value} />
          </Styled.ActiveChip>
        );
      })}
    </Styled.ChipsContainer>
  );
};

const PlayOrFold = () => {
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);

  const handlePlay = () => {
    webSocketClient.emit("MESSAGE", {
      type: "PLAY_BET",
      payload: {
        roundId: round?.id,
      },
    });
  };

  const handleFold = () => {
    webSocketClient.emit("MESSAGE", {
      type: "FOLD",
      payload: {
        gameId: game?.id,
        roundId: round?.id,
      },
    });
  };

  return (
    <Styled.PlayOrPassContainer>
      <Styled.Title>MAKE YOUR DECISION</Styled.Title>
      <Styled.PlayOrPassButtonsContainer>
        <Styled.PlayOrPassButton onClick={handlePlay} primary>
          PLAY x2
        </Styled.PlayOrPassButton>
        <Styled.PlayOrPassButton onClick={handleFold}>
          FOLD
        </Styled.PlayOrPassButton>
      </Styled.PlayOrPassButtonsContainer>
    </Styled.PlayOrPassContainer>
  );
};

const Balance = () => {
  const round = useAppSelector((state) => state.round.data);
  const account = useAppSelector((state) => state.auth.account);

  const AABetSum = _.sum(round?.aa_bet);
  const anteBetSum = _.sum(round?.ante_bet);
  const playBet = round?.play_bet || 0;
  const temporaryBalance =
    account?.balance! - (AABetSum + anteBetSum + playBet);

  return <Styled.Balance>Balance: ${temporaryBalance}</Styled.Balance>;
};

const TotalBets = () => {
  const round = useAppSelector((state) => state.round.data);

  const totalBets =
    _.sum(round?.aa_bet) + _.sum(round?.ante_bet) + round?.play_bet!;

  return <Styled.Balance>Total bets: ${totalBets || 0}</Styled.Balance>;
};

const Info = () => {
  return (
    <Styled.Info>
      <Balance />
      <TotalBets />
      <AntePayTable />
      <AAPayTable />
    </Styled.Info>
  );
};

const Game = () => {
  const room = useAppSelector((state) => state.room.data);
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);
  const account = useAppSelector((state) => state.auth.account);
  const winner = useAppSelector((state) => state.round.winner);

  const handleStartGame = () => {
    webSocketClient.emit("MESSAGE", {
      type: "CREATE_GAME",
      payload: {
        roomId: room?.id,
        dealerId: room?.dealer_id!,
        playerId: account?.id,
      },
    });
  };

  const sumOfPlayedCards = useMemo(() => {
    if (round) {
      return (
        round?.dealer_cards.length +
        round?.player_cards.length +
        round?.common_cards.length
      );
    } else {
      return 0;
    }
  }, [round]);

  if (!game) {
    return (
      <Styled.JoinGameButton onClick={handleStartGame}>
        Start Game
      </Styled.JoinGameButton>
    );
  }

  return (
    <Styled.Game>
      <Styled.Board>
        <StatusBar />
        <Styled.Layer>
          <Info />
          {!_.isNull(winner) && <Result />}
          {round?.bets_over == false && <Bets />}
          {sumOfPlayedCards === 7 && _.isNull(round?.play_bet) && (
            <PlayOrFold />
          )}
          <Cards />
          <Buttons />
        </Styled.Layer>
      </Styled.Board>
    </Styled.Game>
  );
};

export const PlayerView = () => {
  useWebRTC();
  const mediaStream = useAppSelector((state) => state.app.mediaStream);

  return (
    <Styled.Container>
      {mediaStream && (
        <Styled.Wrapper>
          <Video />
          <Game />
        </Styled.Wrapper>
      )}
    </Styled.Container>
  );
};
