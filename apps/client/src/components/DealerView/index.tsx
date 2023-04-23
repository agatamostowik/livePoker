import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import _, { isUndefined } from "lodash";
import * as Styled from "./styles";
import { GameApi } from "../../redux/RTK";
import { useParams } from "react-router-dom";
import { webSocketClient } from "../../webSocket";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setMediaStream, setVideoIsPlaying } from "../../redux/slices/app";

import { Peer } from "peerjs";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const useMediaStream = () => {
  const dispatch = useAppDispatch();
  const mediaStream = useAppSelector((state) => state.app.mediaStream);

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

  return { mediaStream };
};

// const createPeer = (mediaStream: MediaStream) => {
//   return new SimplePeer({
//     initiator: true,
//     stream: mediaStream,
//     trickle: false,
//     config: {
//       iceServers: [
//         {
//           urls: "turn:numb.viagenie.ca",
//           credential: "muazkh",
//           username: "webrtc@live.com",
//         },
//       ],
//     },
//   });
// };

const useWebRTC = (mediaStream: MediaStream) => {
  // const { roomId } = useParams();
  // const [webRTC] = useState(() => createPeer(mediaStream));

  useEffect(() => {
    const peer = new Peer("dealer", {
      host: "localhost",
      port: 9000,
      path: "/peerjs",
      config: {
        iceServers: [
          { url: "stun:stun.l.google.com:19302" },
          {
            url: "turn:192.158.29.39:3478?transport=udp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
          {
            url: "turn:192.158.29.39:3478?transport=tcp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
        ],
      },
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

const Game = (props: { mediaStream: MediaStream }) => {
  const { mediaStream } = props;

  useWebRTC(mediaStream);

  return (
    <Styled.Game>
      <Styled.Board>
        <Styled.Buttons>
          <Styled.AAButton>AA</Styled.AAButton>
          <Styled.AnteButton>Ante</Styled.AnteButton>
        </Styled.Buttons>
      </Styled.Board>
    </Styled.Game>
  );
};

const Sidebar = () => {
  const videoIsPlaying = useAppSelector((state) => state.app.videoIsPlaying);
  const { roomId } = useParams();
  const { data: room, isLoading: isRoomLoading } =
    GameApi.endpoints.getRoomById.useQuery(roomId!);
  const { data: game, isLoading: isGameLoading } =
    GameApi.endpoints.getGameByRoomId.useQuery(room ? room.id : skipToken);
  const { data: round, isLoading: isRoundLoading } =
    GameApi.endpoints.getRoundByGameId.useQuery(game ? game.id : skipToken);

  const handleStartBetting = () => {
    webSocketClient.emit("startBetting", {
      roomId: game?.room_id,
      gameId: game?.id,
      playerId: game?.player_id,
    });
  };

  const handleStopBetting = () => {
    webSocketClient.emit("stopBetting", {
      roomId: game?.room_id,
      gameId: game?.id,
      roundId: round?.id,
    });
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
          disabled={game == null || round?.ante_bet !== null}
          onClick={handleStopBetting}
        >
          Stop taking bets
        </Styled.StartBetting>
      </div>

      <div>Video is playing: {videoIsPlaying.toString()}</div>
    </Styled.Aside>
  );
};

const Video = (props: { mediaStream: MediaStream }) => {
  const { mediaStream } = props;

  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current!.srcObject = mediaStream;
    dispatch(setVideoIsPlaying(true));
  }, []);

  return <Styled.Video ref={videoRef} autoPlay />;
};

export const DealerView = () => {
  // const { roomId } = useParams();
  // const {
  //   data: room,
  //   isLoading: isRoomLoading,
  //   isSuccess: isRoomSuccess,
  // } = GameApi.endpoints.getRoomById.useQuery(roomId!);
  // const {
  //   data: game,
  //   isLoading: isGameLoading,
  //   isSuccess: isGameSuccess,
  // } = GameApi.endpoints.getGameByRoomId.useQuery(room ? room.id : skipToken);
  // const {
  //   data: round,
  //   isLoading: isRoundLoading,
  //   isSuccess: isRoundSuccess,
  // } = GameApi.endpoints.getRoundByGameId.useQuery(game ? game.id : skipToken);

  const { mediaStream } = useMediaStream();

  // if (!isRoomSuccess) {
  //   return <div>Loading</div>;
  // }

  return (
    <Styled.Container>
      <Sidebar />
      <Styled.Test>
        {mediaStream && (
          <>
            <Video mediaStream={mediaStream} />
            <Game mediaStream={mediaStream} />
          </>
        )}
      </Styled.Test>
    </Styled.Container>
  );
};
