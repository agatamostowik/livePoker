import { useEffect, useRef, useState } from "react";
import { useMeasure } from "react-use";
import { io, Socket } from "socket.io-client";
import SimplePeer from "simple-peer";
import * as Styled from "./styles";

const DealerView = () => {
  const [peer, setPeer] = useState<SimplePeer.Instance>();
  const [socket, setSocket] = useState<Socket>();
  const [containerRef, { width, height }] = useMeasure<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io("ws://localhost:3001");

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleToogleVideo = async () => {
    if (isPlaying) {
      videoRef.current!.srcObject = null;
      setIsPlaying(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        videoRef.current!.srcObject = stream;
        setStream(stream);
        setIsPlaying(true);
      } catch (error) {
        console.log("Error accessing media devices", error);
      }
    }
  };

  useEffect(() => {
    return () => {
      peer?.destroy();
    };
  });

  const handleToggleStream = async () => {
    if (isBroadcasting) {
      setIsBroadcasting(false);
    } else {
      const peerConnection = new SimplePeer({
        initiator: true, // inicjujemy połączenie oraz oznacza, że to nasz peer jest inicjatorem
        stream: stream, // przekazujemy nasz strumień wideo
        trickle: false, // nie ustawiamy kropli (progresywne ładowanie), aby uniknąć opóźnień / Wymusza zbatchowanie ofert i odpowiedzi, co zmniejsza obciążenie sieci
      });

      peerConnection.on("connect", () => {
        console.log("Connected"); // Jeśli się połączyliśmy, to logujemy informację
      });

      // nasłuchujemy sygnały peer-to-peer
      peerConnection.on("signal", (data) => {
        // wysyłamy sygnał do drugiego klienta poprzez WebSocket
        socket?.emit("signal", data);
      });

      socket?.on("signal", (signal) => {
        peerConnection.signal(signal);
      });

      setPeer(peerConnection);
      setIsBroadcasting(true);
    }
  };

  const handleToogleConnectionToServer = () => {
    if (isConnected) {
      if (socket) {
        socket.disconnect();
        setIsConnected(false);
      }
    } else {
      if (socket) {
        socket.connect();
        setIsConnected(true);
      }
    }
  };

  return (
    <Styled.Container ref={containerRef}>
      <Styled.Floating>
        <h1>Dealer view</h1>
        <div>
          <button onClick={handleToogleConnectionToServer}>
            {isConnected
              ? "Disconnect from WebSocket server"
              : "Connect to WebSocket server"}
          </button>
        </div>
        <div>
          <button onClick={handleToogleVideo}>
            {isPlaying ? "Stop Video" : "Start Video"}
          </button>
        </div>
        <div>
          <button onClick={handleToggleStream}>
            {isBroadcasting ? "Stop broadcasting" : "Start broadcasting"}
          </button>
        </div>

        <div>WebSocket connection: {isConnected.toString()}</div>
        <div>Video: {isPlaying.toString()}</div>
        <div>Broadcasting: {isBroadcasting.toString()}</div>
      </Styled.Floating>
      <Styled.Video ref={videoRef} autoPlay width={width} height={height} />
    </Styled.Container>
  );
};

const PlayerView = () => {
  const [socket, setSocket] = useState<Socket>();
  const [peer, setPeer] = useState<SimplePeer.Instance>();
  const [containerRef, { width, height }] = useMeasure<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const newSocket = io("ws://localhost:3001", {
      autoConnect: false,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleToogleConnectionToServer = () => {
    if (isConnected) {
      if (socket) {
        socket.disconnect();
        setIsConnected(false);
      }
    } else {
      if (socket) {
        socket.connect();
        setIsConnected(true);
      }
    }
  };

  const handleToogleStreamingFromVideo = () => {
    const peerConnection = new SimplePeer();

    peerConnection.on("connect", () => {
      console.log("Connected");
    });

    peerConnection.on("signal", (data) => {
      socket?.emit("signal", data);
    });

    socket?.on("signal", (signal) => {
      peerConnection.signal(signal);
    });

    peerConnection.on("stream", (stream) => {
      videoRef.current!.srcObject = stream;
    });

    setPeer(peerConnection);
    setIsPlaying(true);
  };

  return (
    <Styled.Container ref={containerRef}>
      <Styled.Floating>
        <h1>Player view</h1>
        <div>
          <button onClick={handleToogleConnectionToServer}>
            {isConnected
              ? "Disconnect from WebSocket server"
              : "Connect to WebSocket server"}
          </button>
        </div>
        <div>
          <button onClick={handleToogleStreamingFromVideo}>
            {isPlaying ? "Disconnect from stream" : "Play a stream"}
          </button>
        </div>

        <div>WebSocket connection: {isConnected.toString()}</div>
        <div>Streaming: {isPlaying.toString()}</div>
      </Styled.Floating>
      <Styled.Video ref={videoRef} autoPlay width={width} height={height} />
    </Styled.Container>
  );
};

export const Room = () => {
  const [iamDealer, setIamDealer] = useState(true);
  return (
    <Styled.Container>
      <Styled.Button onClick={() => setIamDealer(!iamDealer)}>
        {iamDealer ? "switch to player" : "switch to dealer"}
      </Styled.Button>
      {iamDealer ? <DealerView /> : <PlayerView />}
    </Styled.Container>
  );
};

// const DealerView = () => {
//   const [socket, setSocket] =
//     useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
//   const videoRef = useRef<any>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [containerRef, { width, height }] = useMeasure<HTMLDivElement>();
//   const [frames] = useState(30);
//   const [isBroadcasting, setIsBroadcasting] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);

//   // const startBroadcast = () => {
//   //   setIsBroadcasting(true);
//   // };

//   // const stopBroadcast = () => {
//   //   setIsBroadcasting(false);
//   // };

//   useInterval(
//     () => {
//       const context = canvasRef.current!.getContext("2d");
//       context!.drawImage(videoRef.current, 0, 0, width, height);

//       canvasRef.current!.toBlob(async (blob) => {
//         if (socket) {
//           socket.emit("stream", blob);
//         }
//       }, "video/mp4");
//     },
//     isPlaying ? 1000 / frames : null
//   );

//   // useInterval(
//   //   () => {
//   //     if (socket) {
//   //       canvasRef.current!.toBlob((blob) => {
//   //         if (socket) {
//   //           socket.emit("stream", blob);
//   //         }
//   //       }, "video/mp4");
//   //     }
//   //   },
//   //   isBroadcasting ? 1000 / frames : null
//   // );

//   // useInterval(
//   //   () => {
//   //     if (socket) {
//   //       const stream = videoRef.current?.captureStream();
//   //       socket.emit("stream", stream);
//   //     }
//   //   },
//   //   isBroadcasting ? 1000 / frames : null
//   // );

//   useEffect(() => {
//     const newSocket = io("ws://localhost:3001/video", {
//       autoConnect: false,
//     });

//     setSocket(newSocket);
//   }, []);

//   const startVideo = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: false })
//       .then((stream) => {
//         videoRef.current!.srcObject = stream;
//         videoRef.current!.play();
//         setIsPlaying(true);
//       })
//       .catch((err) => {
//         console.error("error:", err);
//       });
//   };

//   const stopVideo = () => {
//     videoRef.current!.pause();
//     videoRef.current!.srcObject = null;
//     setIsPlaying(false);
//     setIsBroadcasting(false);
//   };

//   const connectToServer = () => {
//     if (socket) {
//       socket.connect();
//       setIsConnected(true);
//     }
//   };

//   return (
//     <Styled.Container ref={containerRef}>
//       <Styled.Floating>
//         <h1>Dealer view</h1>

//         <button onClick={connectToServer} disabled={isConnected}>
//           Connect to server
//         </button>

//         <div>
//           <button onClick={startVideo} disabled={isPlaying}>
//             Start Video
//           </button>
//           <button onClick={stopVideo} disabled={!isPlaying}>
//             Stop Video
//           </button>
//         </div>
//         <div>Video Capturing: {isPlaying.toString()}</div>
//         <div>Connected to the server: {isConnected.toString()}</div>
//         {/* <div>Broadcasting: {isBroadcasting.toString()}</div> */}
//       </Styled.Floating>

//       <Styled.Video ref={videoRef} hidden />
//       <canvas ref={canvasRef} width={width} height={height} />
//     </Styled.Container>
//   );
// };

// const PlayerView = () => {
//   const [containerRef, { width, height }] = useMeasure<HTMLDivElement>();
//   const [socket, setSocket] =
//     useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [videoURL, setVideoURL] = useState<string>("");

//   const [isConnected, setIsConnected] = useState(false);

//   const onStream = async (data: any) => {
//     const blob = new Blob([data], { type: "video/mp4" });
//     const videoURL = URL.createObjectURL(blob);

//     setVideoURL(videoURL);
//   };

//   useEffect(() => {
//     const newSocket = io("ws://localhost:3001/video", {
//       autoConnect: false,
//     });

//     newSocket.on("stream", onStream);
//     setSocket(newSocket);

//     return () => {
//       newSocket.off("stream", onStream);
//     };
//   }, []);

//   const connectToServer = () => {
//     if (socket) {
//       socket.connect();
//       setIsConnected(true);
//     }
//   };

//   return (
//     <Styled.Container ref={containerRef}>
//       <Styled.Floating>
//         <h1>Player View</h1>
//         <button onClick={connectToServer} disabled={isConnected}>
//           Connect to server
//         </button>
//         <div>Connected to the server: {isConnected.toString()}</div>
//       </Styled.Floating>

//       <Styled.Video ref={videoRef} autoPlay width={width} height={height}>
//         <source src={videoURL} type="video/mp4" />
//       </Styled.Video>
//     </Styled.Container>
//   );
// };

// const peerConnection = new RTCPeerConnection({
//   iceServers: [
//     {
//       urls: "stun:stun.l.google.com:19302",
//     },
//     {
//       urls: "stun:stun1.l.google.com:19302",
//     },
//   ],
// });

// peerConnection.onnegotiationneeded = async () => {
//   const offer = await peerConnection.createOffer();
//   await peerConnection.setLocalDescription(offer);

//   socket?.emit("offer", offer);
// };

// peerConnection.onicecandidate = (event) => {
//   if (event.candidate) {
//     socket?.emit("candidate", event.candidate);
//   }
// };

// stream
//   ?.getTracks()
//   .forEach((track) => peerConnection.addTrack(track, stream));
