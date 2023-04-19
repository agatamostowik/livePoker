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

  const game = useAppSelector((state) => state.app.game);
  const round = useAppSelector((state) => state.app.round);

  const handleStartGame = () => {
    webSocketClient.emit("startGame", {
      roomId: roomId!,
      playerId: playerId!,
      dealerId: data?.dealer_id!,
    });
  };

  return (
    <Styled.Game>
      <Styled.Board>
        {!game && (
          <Styled.JoinGameButton onClick={handleStartGame}>
            Join Game
          </Styled.JoinGameButton>
        )}
        {round && (
          <Styled.ChipsContainer>
            <p>UNDO</p>
            <Styled.Chip>UNDO</Styled.Chip>
            <Styled.Chip>0.5</Styled.Chip>
            <Styled.Chip>1</Styled.Chip>
            <Styled.Chip>5</Styled.Chip>
            <Styled.Chip>25</Styled.Chip>
            <Styled.Chip>100</Styled.Chip>
            <Styled.Chip>500</Styled.Chip>
            <Styled.Chip>x2</Styled.Chip>
            <p>DOUBLE</p>
          </Styled.ChipsContainer>
        )}
        <Styled.Buttons>
          <Styled.AAButton>AA</Styled.AAButton>
          <Styled.AnteButton>Ante</Styled.AnteButton>
        </Styled.Buttons>
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
