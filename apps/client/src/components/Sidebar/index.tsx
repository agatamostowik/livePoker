import _ from "lodash";
import { useMemo } from "react";
import { webSocketClient } from "../../webSocket";
import { useAppSelector } from "../../redux/store";
import * as Styled from "./styles";

const StartBetting = (props: { isActive: boolean }) => {
  const game = useAppSelector((state) => state.game.data);

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

  return (
    <div>
      <Styled.SidebarButton
        disabled={!props.isActive}
        onClick={handleStartBetting}
      >
        Start taking bets
      </Styled.SidebarButton>
    </div>
  );
};

const StopBetting = (props: { isActive: boolean }) => {
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

  return (
    <div>
      <Styled.SidebarButton
        disabled={!props.isActive}
        onClick={handleStopBetting}
      >
        Stop taking bets
      </Styled.SidebarButton>
    </div>
  );
};

const PlayTurnRiverCard = (props: { isActive: boolean }) => {
  const round = useAppSelector((state) => state.round.data);

  const handleClick = () => {
    webSocketClient.emit("MESSAGE", {
      type: "PLAY_TURN_RIVER_CARDS",
      payload: {
        roundId: round?.id,
      },
    });
  };

  return (
    <div>
      <Styled.SidebarButton disabled={!props.isActive} onClick={handleClick}>
        Play Turn and River cards
      </Styled.SidebarButton>
    </div>
  );
};

const PlayFlopCards = (props: { isActive: boolean }) => {
  const round = useAppSelector((state) => state.round.data);

  const playFlopCards = () => {
    webSocketClient.emit("MESSAGE", {
      type: "PLAY_FLOP_CARDS",
      payload: {
        roundId: round?.id,
      },
    });
  };

  return (
    <div>
      <Styled.SidebarButton disabled={!props.isActive} onClick={playFlopCards}>
        Play flop cards
      </Styled.SidebarButton>
    </div>
  );
};

const EvaluateHands = (props: { isActive: boolean }) => {
  const round = useAppSelector((state) => state.round.data);

  const checkResult = () => {
    webSocketClient.emit("evaluateHands", {
      roundId: round?.id,
    });
  };

  return (
    <div>
      <Styled.SidebarButton disabled={!props.isActive} onClick={checkResult}>
        Check the result
      </Styled.SidebarButton>
    </div>
  );
};

export const Sidebar = () => {
  const isPlayerConnected = useAppSelector(
    (state) => state.app.isPlayerConnected
  );
  const videoIsPlaying = useAppSelector((state) => state.app.videoIsPlaying);
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);

  const numberCardsPlayed = round
    ? round?.dealer_cards?.length +
      round?.player_cards?.length +
      round?.common_cards.length
    : 0;

  return (
    <Styled.AsideContainer>
      <Styled.Aside>
        <Styled.AsideBackground />
        <Styled.Phases>
          <Styled.Phase>Video: {videoIsPlaying ? "ON" : "OFF"}</Styled.Phase>
          <Styled.Phase>
            Player connected: {isPlayerConnected ? "YES" : "NO"}
          </Styled.Phase>
          {game && (
            <Styled.Phase success>Player: Started the game.</Styled.Phase>
          )}
          {!game && (
            <Styled.Phase>Waiting for player to join the game...</Styled.Phase>
          )}

          {game && round && (
            <Styled.Phase success>Dealer: Started the round.</Styled.Phase>
          )}
          {game && !round && (
            <Styled.Phase>Waiting for round get started...</Styled.Phase>
          )}

          {game && round && !round?.bets_over && (
            <Styled.Phase>Player bets...</Styled.Phase>
          )}
          {game && round && round?.bets_over && (
            <Styled.Phase success>Dealer: Finished bets.</Styled.Phase>
          )}

          {game && round && round?.bets_over && numberCardsPlayed < 7 && (
            <Styled.Phase>Waiting for playing flop cards...</Styled.Phase>
          )}

          {game && round && round?.bets_over && numberCardsPlayed >= 7 && (
            <Styled.Phase success>
              Dealer: Played cards on the flop
            </Styled.Phase>
          )}

          {game && round && round?.bets_over && numberCardsPlayed >= 7 && (
            <Styled.Phase>
              Waiting for playing turn and river cards...
            </Styled.Phase>
          )}

          <StartBetting isActive={!_.isNull(game) && _.isNull(round)} />
          <StopBetting
            isActive={!_.isNull(game) && !_.isNull(round) && !round.bets_over}
          />
          <PlayFlopCards
            isActive={
              !_.isNull(game) &&
              !_.isNull(round) &&
              round.bets_over &&
              numberCardsPlayed < 7
            }
          />
          {/* <PlayTurnRiverCard
            isActive={
              !_.isNull(game) &&
              !_.isNull(round) &&
              round.bets_over &&
              numberCardsPlayed === 7
            }
          /> */}
          {/* <EvaluateHands
            isActive={
              !_.isNull(game) &&
              !_.isNull(round) &&
              round.bets_over &&
              numberCardsPlayed === 9
            }
          /> */}
        </Styled.Phases>
      </Styled.Aside>
    </Styled.AsideContainer>
  );
};
