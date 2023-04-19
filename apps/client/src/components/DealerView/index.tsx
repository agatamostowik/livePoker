import { RefObject, useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import _ from "lodash";
import * as Styled from "./styles";
import { GameApi } from "../../redux/RTK";
import { useParams } from "react-router-dom";
import { webSocketClient } from "../../webSocket";

const useMediaStream = (videoRef: RefObject<HTMLVideoElement>) => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();

  const getMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      setMediaStream(stream);
      videoRef.current!.srcObject = stream;
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

export const DealerView = () => {
  const { roomId } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { mediaStream } = useMediaStream(videoRef);
  const { webRTC } = useWebRTC(mediaStream);
  const { data, isLoading } = GameApi.endpoints.getRoomById.useQuery(roomId!);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Styled.Container>
      <Styled.Floating>
        <h1>Dealer view</h1>
      </Styled.Floating>

      <Styled.Video ref={videoRef} autoPlay />
    </Styled.Container>
  );
};
