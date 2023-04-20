import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import _ from "lodash";
import * as Styled from "./styles";
import { GameApi } from "../../redux/RTK";
import { useParams } from "react-router-dom";
import { webSocketClient } from "../../webSocket";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setMediaStream, setVideoIsPlaying } from "../../redux/slices/app";

import { Peer } from "peerjs";

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
  const { roomId } = useParams();
  // const [webRTC] = useState(() => createPeer(mediaStream));

  useEffect(() => {
    const peer = new Peer("streamer", {
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

    const call = peer.call("player", mediaStream);
    // call.on("stream", (remoteStream) => {
    //   console.log("remoteStream: ", remoteStream);
    //   // Show stream in some <video> element.
    // });

    // const webRTC = createPeer(mediaStream);

    // webSocketClient.on("pong", (receiverAddress) => {
    //   webRTC.signal(receiverAddress);
    // });

    // webSocketClient.on("iceConnectionState", (status) => {
    //   console.log(status);
    // });

    // webRTC.on("signal", async (signal) => {
    //   webSocketClient.emit("updateRoom", {
    //     roomId: roomId!,
    //     streamAddress: signal,
    //   });
    // });
  }, []);
};

const Game = (props: { mediaStream: MediaStream }) => {
  const { mediaStream } = props;

  useWebRTC(mediaStream);

  return (
    <Styled.Game>
      <Styled.Board>
        <Styled.Buttons>
          {/* <Styled.AAButton>AA</Styled.AAButton> */}
          <Styled.AnteButton>Ante</Styled.AnteButton>
        </Styled.Buttons>
      </Styled.Board>
    </Styled.Game>
  );
};

const Sidebar = () => {
  const game = useAppSelector((state) => state.app.game);
  const round = useAppSelector((state) => state.app.round);
  const videoIsPlaying = useAppSelector((state) => state.app.videoIsPlaying);

  const handleStartBetting = () => {
    webSocketClient.emit("startBetting", {
      gameId: game?.id,
      playerId: game?.player_id,
      roomId: game?.room_id,
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

      <Styled.StartBetting
        disabled={game == null || round !== null}
        onClick={handleStartBetting}
      >
        Start taking bets
      </Styled.StartBetting>
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
  const { roomId } = useParams();
  const { isSuccess } = GameApi.endpoints.getRoomById.useQuery(roomId!);
  const { mediaStream } = useMediaStream();

  if (!isSuccess) {
    return <div>Loading</div>;
  }

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
