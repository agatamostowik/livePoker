import { useRef } from "react";
import { useMeasure } from "react-use";

function App() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [_ref, { x, y, width, height, top, right, bottom, left }] =
    useMeasure();

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width }, audio: false })
      .then((stream) => {
        videoRef.current!.srcObject = stream;
        videoRef.current!.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  return (
    <div className="canvas" ref={canvasRef}>
      <button className="button" onClick={getVideo}>
        getVideo
      </button>
      <video className="video" ref={videoRef} />
      <canvas />
    </div>
  );
}

export default App;
