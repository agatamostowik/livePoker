import { RefObject, useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import _ from "lodash";
import { GameApi, Room } from "../../redux/RTK";
import { useParams } from "react-router-dom";
import { webSocketClient } from "../../webSocket";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import * as Styled from "./styles";
import { setMediaStream, setVideoIsPlaying } from "../../redux/slices/app";

const createPeer = () => {
  return new SimplePeer({
    initiator: false,
  });
};

const useWebRTC = (room: Room) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const webRTC = createPeer();

    webRTC.signal(JSON.parse(room.stream_address));

    webRTC.on("signal", (signal) => {
      webSocketClient.emit("ping", signal);
    });

    // // only for player
    webRTC.on("stream", (mediaStream) => {
      console.log("mediaStream:", mediaStream);
      dispatch(setMediaStream(mediaStream));
    });

    webSocketClient.on("pong", (streamerAddress) => {
      webRTC.signal(streamerAddress);
    });
  }, []);
};

const Game = (props: { room: Room }) => {
  const { room } = props;

  useWebRTC(room);

  return null;
  // const { roomId } = useParams();
  // const { data } = GameApi.endpoints.getRoomById.useQuery(roomId!);
  // const [startGame] = GameApi.endpoints.startGame.useMutation();
  // const playerId = useAppSelector((state) => state.app.user?.id);

  // const game = useAppSelector((state) => state.app.game);
  // const round = useAppSelector((state) => state.app.round);

  // const handleStartGame = () => {
  //   webSocketClient.emit("startGame", {
  //     roomId: roomId!,
  //     playerId: playerId!,
  //     dealerId: data?.dealer_id!,
  //   });
  // };

  // return (
  //   <Styled.Game>
  //     <Styled.Board>
  //       {!game && (
  //         <Styled.JoinGameButton onClick={handleStartGame}>
  //           Join Game
  //         </Styled.JoinGameButton>
  //       )}
  //       {round && (
  //         <Styled.ChipsContainer>
  //           <p>UNDO</p>
  //           <Styled.Chip>UNDO</Styled.Chip>
  //           <Styled.Chip>0.5</Styled.Chip>
  //           <Styled.Chip>1</Styled.Chip>
  //           <Styled.Chip>5</Styled.Chip>
  //           <Styled.Chip>25</Styled.Chip>
  //           <Styled.Chip>100</Styled.Chip>
  //           <Styled.Chip>500</Styled.Chip>
  //           <Styled.Chip>x2</Styled.Chip>
  //           <p>DOUBLE</p>
  //         </Styled.ChipsContainer>
  //       )}
  //       {round && (
  //         <Styled.Buttons>
  //           <Styled.AAButton>AA</Styled.AAButton>
  //           <Styled.AnteButton>Ante</Styled.AnteButton>
  //         </Styled.Buttons>
  //       )}
  //     </Styled.Board>
  //   </Styled.Game>
  // );
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

export const PlayerView = () => {
  const { roomId } = useParams();
  const { data, isSuccess } = GameApi.endpoints.getRoomById.useQuery(roomId!);
  const mediaStream = useAppSelector((state) => state.app.mediaStream);

  if (!isSuccess) {
    return <div>Loading</div>;
  }
  console.log();
  return (
    <Styled.Container>
      <Styled.Test>
        {mediaStream && <Video mediaStream={mediaStream} />}
        {data && <Game room={data} />}
      </Styled.Test>
    </Styled.Container>
  );
};
