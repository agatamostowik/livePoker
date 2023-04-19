import { RefObject, useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import _ from "lodash";
import * as Styled from "./styles";
import { GameApi, Room } from "../../redux/RTK";
import { useParams } from "react-router-dom";
import { webSocketClient } from "../../webSocket";
import { useAppSelector } from "../../redux/store";

const useWebRTC = (videoRef: RefObject<HTMLVideoElement>, room?: Room) => {
  const [webRTC, setPeer] = useState<SimplePeer.Instance>();

  useEffect(() => {
    if (webRTC || !room) {
      return;
    }

    const receiver = new SimplePeer({
      initiator: false,
    });

    receiver.signal(JSON.parse(room.stream_address));

    webSocketClient.on("pong", (streamerAddress) => {
      receiver.signal(JSON.parse(streamerAddress));
    });

    receiver.on("signal", (signal) => {
      webSocketClient.emit("ping", JSON.stringify(signal));
    });

    // only for receiver
    receiver.on("stream", (stream) => {
      videoRef.current!.srcObject = stream;
    });

    setPeer(receiver);
  }, [webRTC, room]);

  return { webRTC };
};

const Game = () => {
  const { roomId } = useParams();
  const { data, isLoading } = GameApi.endpoints.getRoomById.useQuery(roomId!);
  const [startGame] = GameApi.endpoints.startGame.useMutation();
  const playerId = useAppSelector((state) => state.app.user?.id);

  const handleStartGame = async () => {
    console.log("ping");
    const response = await startGame({
      roomId: roomId!,
      playerId: playerId!,
      dealerId: data?.dealer_id!,
    });
    console.log("response:", response);
  };
  return (
    <Styled.Game>
      <Styled.Board>
        <Styled.JoinGameButton onClick={handleStartGame}>
          Join Game
        </Styled.JoinGameButton>
      </Styled.Board>
    </Styled.Game>
  );
};

export const PlayerView = () => {
  const { roomId } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data, isLoading } = GameApi.endpoints.getRoomById.useQuery(roomId!);
  const { webRTC } = useWebRTC(videoRef, data);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Styled.Container>
      <Styled.Floating>
        <h1>Player view</h1>
      </Styled.Floating>
      <Styled.Video ref={videoRef} autoPlay />
      <Game />
    </Styled.Container>
  );
};
