import _ from "lodash";
import { Peer } from "peerjs";
import { useEffect, useMemo } from "react";
import { webSocketClient } from "../../webSocket";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setMediaStream } from "../../redux/slices/app";
import { Cards } from "../Cards";
import { Video } from "../Video";
import * as Styled from "./styles";

const useMediaStream = () => {
  const dispatch = useAppDispatch();

  const getMediaStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      dispatch(setMediaStream(mediaStream));
    } catch (error) {
      console.log("odrzucono połączenie!", error);
    }
  };

  useEffect(() => {
    getMediaStream();
  }, []);
};

const useWebRTC = () => {
  const mediaStream = useAppSelector((state) => state.app.mediaStream)!;

  useEffect(() => {
    const peer = new Peer("dealer", {
      host: "localhost",
      port: 9000,
      path: "/peerjs",
      // config: {
      //   iceServers: [
      //     { url: "stun:stun.l.google.com:19302" },
      //     {
      //       url: "turn:192.158.29.39:3478?transport=udp",
      //       credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      //       username: "28224511:1379330808",
      //     },
      //     {
      //       url: "turn:192.158.29.39:3478?transport=tcp",
      //       credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      //       username: "28224511:1379330808",
      //     },
      //   ],
      // },
    });

    peer.on("error", (error) => {
      console.log("error", error);
    });

    peer.on("connection", () => {
      peer.call("player", mediaStream);
      console.log("connected");
    });

    peer.on("open", () => {
      peer.call("player", mediaStream);
      console.log("opened");
    });

    peer.on("disconnected", () => {
      peer.reconnect();
      console.log("disconnected");
    });
  }, []);
};

const Buttons = () => {
  const round = useAppSelector((state) => state.round.data);

  const AABetSum = _.sum(round?.aa_bet);
  const anteBetSum = _.sum(round?.ante_bet);

  return (
    <Styled.Buttons>
      <Styled.AAButton>
        AA
        {AABetSum > 0 && (
          <Styled.PlacedBetChip>{AABetSum}</Styled.PlacedBetChip>
        )}
      </Styled.AAButton>
      <Styled.AnteButton>
        ANTE
        {anteBetSum > 0 && (
          <Styled.PlacedBetChip>{anteBetSum}</Styled.PlacedBetChip>
        )}
      </Styled.AnteButton>
      <Styled.PlayButton>
        Play
        {round?.play_bet && (
          <Styled.PlacedBetChip>{round.play_bet}</Styled.PlacedBetChip>
        )}
      </Styled.PlayButton>
    </Styled.Buttons>
  );
};

const Game = () => {
  useWebRTC();

  return (
    <Styled.Game>
      <Styled.Board>
        <Cards />
        <Buttons />
      </Styled.Board>
    </Styled.Game>
  );
};

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
  const round = useAppSelector((state) => state.round.data);

  const isDisabled = useMemo(() => {
    if (round) {
      const sum =
        round?.dealer_cards.length +
        round?.player_cards.length +
        round?.common_cards.length;

      return sum > 0;
    }
  }, [round]);

  const showCards = () => {
    webSocketClient.emit("showCards", round?.id);
  };

  return (
    <div>
      <Styled.StartBetting disabled={isDisabled} onClick={showCards}>
        play cards
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

const Sidebar = () => {
  const videoIsPlaying = useAppSelector((state) => state.app.videoIsPlaying);
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);

  return (
    <Styled.Aside>
      <h1>Dealer view</h1>

      {game ? (
        <div>Player started the game</div>
      ) : (
        <div>Waiting for player to join the game...</div>
      )}

      {game &&
        (round ? (
          <div>Dealer started the round</div>
        ) : (
          <div>Waiting for round get started...</div>
        ))}

      {game &&
        round &&
        (round?.bets_over ? (
          <div>Zakłady zakończone</div>
        ) : (
          <div>Przyjmowanie zakładów</div>
        ))}

      <StartBetting />
      <StopBetting />
      <PlayFlopCards />
      <PlayTurnAndRiverCard />
      <EvaluateHands />

      <div>Video is playing: {videoIsPlaying.toString()}</div>
    </Styled.Aside>
  );
};

export const DealerView = () => {
  useMediaStream();
  const mediaStream = useAppSelector((state) => state.app.mediaStream);

  return (
    <Styled.Container>
      <Sidebar />
      <Styled.Test>
        <Video />
        {mediaStream && <Game />}
      </Styled.Test>
    </Styled.Container>
  );
};
