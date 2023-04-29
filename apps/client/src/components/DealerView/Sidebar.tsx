import _ from "lodash";
import { useMemo } from "react";
import { webSocketClient } from "../../webSocket";
import { useAppSelector } from "../../redux/store";
import * as Styled from "./styles";

const StartBetting = () => {
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);

  const handleStartBetting = () => {
    webSocketClient.emit("startBetting", {
      roomId: game?.room_id,
      gameId: game?.id,
      playerId: game?.player_id,
    });
  };

  return (
    <div>
      <Styled.StartBetting
        disabled={game == null || round !== null}
        onClick={handleStartBetting}
      >
        Start taking bets
      </Styled.StartBetting>
    </div>
  );
};

const StopBetting = () => {
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);

  const handleStopBetting = () => {
    webSocketClient.emit("stopBetting", {
      roundId: round?.id,
      playerId: game?.player_id,
      gameId: game?.id,
    });
  };

  return (
    <div>
      <Styled.StartBetting
        disabled={game == null || round === null || round?.bets_over === true}
        onClick={handleStopBetting}
      >
        Stop taking bets
      </Styled.StartBetting>
    </div>
  );
};

const PlayTurnAndRiverCard = () => {
  const round = useAppSelector((state) => state.round.data);

  const handleClick = () => {
    webSocketClient.emit("playTurnAndRiverCard", {
      roundId: round?.id,
    });
  };

  const isDisabled =
    round === null || round?.play_bet === null || round.common_cards.length > 3;

  return (
    <div>
      <Styled.StartBetting disabled={isDisabled} onClick={handleClick}>
        Play Turn and River cards
      </Styled.StartBetting>
    </div>
  );
};

const PlayFlopCards = () => {
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);

  const isGameStarted = !_.isNull(game);
  const isRoundStarted = !_.isNull(round);

  const isDisabled = useMemo(() => {
    return !isGameStarted && !isRoundStarted;

    // if (round) {
    //   const sum =
    //     round?.dealer_cards.length +
    //     round?.player_cards.length +
    //     round?.common_cards.length;

    //   return sum > 0;
    // }
  }, [round]);

  const showCards = () => {
    webSocketClient.emit("showCards", round?.id);
  };

  return (
    <div>
      <Styled.StartBetting disabled={!isDisabled} onClick={showCards}>
        play flop cards
      </Styled.StartBetting>
    </div>
  );
};

const EvaluateHands = () => {
  const round = useAppSelector((state) => state.round.data);

  const sprawdz = () => {
    webSocketClient.emit("evaluateHands", {
      roundId: round?.id,
    });
  };

  return (
    <div>
      <Styled.StartBetting onClick={sprawdz}>sprawdz wynik</Styled.StartBetting>
    </div>
  );
};

export const Sidebar = () => {
  const videoIsPlaying = useAppSelector((state) => state.app.videoIsPlaying);
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);

  return (
    <Styled.Aside>
      <div>Video is playing: {videoIsPlaying.toString()}</div>
      {game && <Styled.Phase success>Player: Started the game.</Styled.Phase>}
      {!game && (
        <Styled.Phase>Waiting for player to join the game...</Styled.Phase>
      )}

      {game && round && (
        <Styled.Phase success>Dealer: started the round.</Styled.Phase>
      )}
      {game && !round && (
        <Styled.Phase>Waiting for round get started...</Styled.Phase>
      )}

      {game && round && round?.bets_over && (
        <Styled.Phase success>Dealer: Zakłady zakończone</Styled.Phase>
      )}
      {game && round && !round?.bets_over && (
        <Styled.Phase>Przyjmowanie zakładów</Styled.Phase>
      )}

      <StartBetting />
      {/* <StopBetting />
      <PlayFlopCards />
      <PlayTurnAndRiverCard />
      <EvaluateHands /> */}
    </Styled.Aside>
  );
};
