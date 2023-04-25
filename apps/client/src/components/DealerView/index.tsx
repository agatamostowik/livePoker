import { useEffect, useRef } from "react";
import _ from "lodash";
import { GameApi, Room } from "../../redux/RTK";
import { useParams } from "react-router-dom";
import { webSocketClient } from "../../webSocket";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setMediaStream } from "../../redux/slices/app";
import * as Styled from "./styles";
import { Peer } from "peerjs";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Cards } from "../Cards";
import {
  useGetGameByRoomIdOnMount,
  useGetRoomOnMount,
  useGetRoundByGameIdOnMount,
} from "../../hooks";
import { Video } from "../Video";

const useMediaStream = () => {
  const dispatch = useAppDispatch();

  const getMediaStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      dispatch(setMediaStream(mediaStream));
    } catch (error) {
      console.log("odrzuconooo połączenieeeee!!", error);
      // TODO: Odrzucone połączenie z kamerką
    }
  };

  useEffect(() => {
    getMediaStream();
  }, []);
};

const useWebRTC = () => {
  const mediaStream = useAppSelector((state) => state.app.mediaStream);

  useEffect(() => {
    if (mediaStream) {
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
    }
  }, [mediaStream]);
};

const Buttons = () => {
  const { roomId } = useParams();
  const { data: room } = GameApi.endpoints.getRoomById.useQuery(roomId!);
  const { data: game } = GameApi.endpoints.getGameByRoomId.useQuery(
    room ? room.id : skipToken
  );
  const { data: round } = GameApi.endpoints.getRoundByGameId.useQuery(
    game ? game.id : skipToken
  );

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
      <Styled.AnteButton>Play</Styled.AnteButton>
    </Styled.Buttons>
  );
};

const Game = () => {
  return (
    <Styled.Game>
      <Styled.Board>
        <Cards />
        <Buttons />
      </Styled.Board>
    </Styled.Game>
  );
};

const Sidebar = () => {
  const videoIsPlaying = useAppSelector((state) => state.app.videoIsPlaying);
  const { roomId } = useParams();
  const { data: room } = GameApi.endpoints.getRoomById.useQuery(roomId!);
  const { data: game } = GameApi.endpoints.getGameByRoomId.useQuery(
    room ? room.id : skipToken
  );
  const { data: round } = GameApi.endpoints.getRoundByGameId.useQuery(
    game ? game.id : skipToken
  );

  const handleStartBetting = () => {
    webSocketClient.emit("startBetting", {
      roomId: game?.room_id,
      gameId: game?.id,
      playerId: game?.player_id,
    });
  };

  const handleStopBetting = () => {
    webSocketClient.emit("stopBetting", {
      roundId: round?.id,
      playerId: game?.player_id,
      gameId: game?.id,
    });
  };

  const showCards = () => {
    webSocketClient.emit("showCards", round?.id);
  };

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

      <div>
        <Styled.StartBetting
          disabled={game == null || round !== null}
          onClick={handleStartBetting}
        >
          Start taking bets
        </Styled.StartBetting>
      </div>

      <div>
        <Styled.StartBetting
          disabled={game == null || round === null || round?.bets_over === true}
          onClick={handleStopBetting}
        >
          Stop taking bets
        </Styled.StartBetting>
      </div>

      <div>
        <Styled.StartBetting onClick={showCards}>
          wyłóż karty
        </Styled.StartBetting>
      </div>

      <div>Video is playing: {videoIsPlaying.toString()}</div>
    </Styled.Aside>
  );
};

export const DealerView = () => {
  useMediaStream();
  useWebRTC();
  useGetRoomOnMount();
  useGetGameByRoomIdOnMount();
  useGetRoundByGameIdOnMount();

  return (
    <Styled.Container>
      <Sidebar />
      <Styled.Test>
        <Video />
        <Game />
      </Styled.Test>
    </Styled.Container>
  );
};
