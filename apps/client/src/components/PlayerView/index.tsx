import { useEffect, useRef, useState } from "react";
import { useMeasure } from "react-use";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import * as Styled from "./styles";

export const PlayerView = () => {
  const [containerRef, { width, height }] = useMeasure<HTMLDivElement>();
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoURL, setVideoURL] = useState<string>("");

  const [isConnected, setIsConnected] = useState(false);

  const onStream = async (data: any) => {
    const blob = new Blob([data], { type: "video/mp4" });
    const videoURL = URL.createObjectURL(blob);

    setVideoURL(videoURL);
  };

  useEffect(() => {
    const newSocket = io("ws://localhost:3001/video", {
      autoConnect: false,
    });

    newSocket.on("stream", onStream);
    setSocket(newSocket);

    return () => {
      newSocket.off("stream", onStream);
    };
  }, []);

  const connectToServer = () => {
    if (socket) {
      socket.connect();
      setIsConnected(true);
    }
  };

  return (
    <Styled.Container ref={containerRef}>
      <Styled.Floating>
        <h1>Player View</h1>
        <button onClick={connectToServer} disabled={isConnected}>
          Connect to server
        </button>
        <div>Connected to the server: {isConnected.toString()}</div>
      </Styled.Floating>

      <Styled.Video ref={videoRef} autoPlay width={width} height={height}>
        <source src={videoURL} type="video/mp4" />
      </Styled.Video>
    </Styled.Container>
  );
};
