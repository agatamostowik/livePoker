import { useEffect, useRef, useState } from "react";
import { useMeasure } from "react-use";
import { io, Socket } from "socket.io-client";
import { useInterval } from "react-use";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import * as Styled from "./styles";

export const DealerView = () => {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const videoRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [containerRef, { width, height }] = useMeasure<HTMLDivElement>();
  const [frames] = useState(30);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useInterval(
    () => {
      const context = canvasRef.current!.getContext("2d");
      context!.drawImage(videoRef.current, 0, 0, width, height);

      canvasRef.current!.toBlob(async (blob) => {
        if (socket) {
          setIsBroadcasting(true);
          socket.emit("stream", blob);
        }
      }, "video/mp4");
    },
    isPlaying ? 1000 / frames : null
  );

  useEffect(() => {
    const newSocket = io("ws://localhost:3001/video", {
      autoConnect: false,
    });

    setSocket(newSocket);
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        videoRef.current!.srcObject = stream;
        videoRef.current!.play();
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const stopVideo = () => {
    videoRef.current!.pause();
    videoRef.current!.srcObject = null;
    setIsPlaying(false);
    setIsBroadcasting(false);
  };

  const connectToServer = () => {
    if (socket) {
      socket.connect();
      setIsConnected(true);
    }
  };

  return (
    <Styled.Container ref={containerRef}>
      <Styled.Floating>
        <h1>Dealer view</h1>

        <button onClick={connectToServer} disabled={isConnected}>
          Connect to server
        </button>

        <div>
          <button onClick={startVideo} disabled={isPlaying}>
            Start Video
          </button>
          <button onClick={stopVideo} disabled={!isPlaying}>
            Stop Video
          </button>
        </div>
        <div>Video Capturing: {isPlaying.toString()}</div>
        <div>Connected to the server: {isConnected.toString()}</div>
        <div>Broadcasting: {isBroadcasting.toString()}</div>
      </Styled.Floating>

      <Styled.Video ref={videoRef} hidden />
      <canvas ref={canvasRef} width={width} height={height} />
    </Styled.Container>
  );
};
