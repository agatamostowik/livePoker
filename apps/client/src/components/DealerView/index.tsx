import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import _ from "lodash";
import * as Styled from "./styles";
import { GameApi } from "../../redux/RTK";
import { useParams } from "react-router-dom";
import { webSocketClient } from "../../webSocket";
import { useAppSelector } from "../../redux/store";

const useMediaStream = (videoRef: RefObject<HTMLVideoElement>) => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  const getMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      setMediaStream(stream);
      videoRef.current!.srcObject = stream;
      setVideoIsPlaying(true);
    } catch (error) {
      console.log("odrzuconooo połączenieeeee!!", error);
      // TODO: Odrzucone połączenie z kamerką
    }
  };

  useEffect(() => {
    getMediaStream();
  }, []);

  return { mediaStream, videoIsPlaying };
};

const useWebRTC = (mediaStream?: MediaStream) => {
  const { roomId } = useParams();
  const [webRTC, setPeer] = useState<SimplePeer.Instance>();
  const [updateRoom] = GameApi.endpoints.updateRoom.useMutation();

  useEffect(() => {
    if (webRTC || !mediaStream) {
      return;
    }

    const streamer = new SimplePeer({
      initiator: true, // inicjujemy połączenie oraz oznacza, że to nasz peer jest inicjatorem
      stream: mediaStream, // przekazujemy nasz strumień wideo
      trickle: false, // nie ustawiamy kropli (progresywne ładowanie), aby uniknąć opóźnień / Wymusza zbatchowanie ofert i odpowiedzi, co zmniejsza obciążenie sieci
    });

    webSocketClient.on("pong", (receiverAddress) => {
      streamer.signal(JSON.parse(receiverAddress));
    });

    streamer.on("signal", async (signal) => {
      await updateRoom({
        roomId: roomId!,
        streamAddress: signal,
      });
    });

    setPeer(streamer);
  }, [mediaStream, webRTC, , roomId]);

  return { webRTC };
};

const Game = () => {
  const game = useAppSelector((state) => state.app.game);
  const round = useAppSelector((state) => state.app.round);

  const handleStartBetting = () => {
    webSocketClient.emit("startBetting", {
      gameId: game?.id,
      playerId: game?.player_id,
      roomId: game?.room_id,
    });
  };

  return (
    <Styled.Game>
      <Styled.Board>
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
        <Styled.Buttons>
          {/* <Styled.AAButton>AA</Styled.AAButton> */}
          <Styled.AnteButton>Ante</Styled.AnteButton>
        </Styled.Buttons>
      </Styled.Board>
    </Styled.Game>
  );
};

export const DealerView = () => {
  const { roomId } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // // https://stackoverflow.com/questions/49058890/how-to-get-a-react-components-size-height-width-before-render
  useLayoutEffect(() => {
    if (videoRef.current) {
      setDimensions({
        width: videoRef.current.offsetWidth,
        height: videoRef.current.offsetHeight,
      });
    }
  }, []);

  const { mediaStream, videoIsPlaying } = useMediaStream(videoRef);
  const { webRTC } = useWebRTC(mediaStream);
  const { data, isLoading } = GameApi.endpoints.getRoomById.useQuery(roomId!);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Styled.Container>
      {videoIsPlaying && <Game />}
      <Styled.Video ref={videoRef} autoPlay />
    </Styled.Container>
  );
};
