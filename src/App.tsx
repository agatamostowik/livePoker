import { useRef } from "react";
import { useMeasure } from "react-use";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();

  const getVideo = () => {
    window.navigator.mediaDevices
      .getUserMedia({ video: { width: 1000 }, audio: false })
      .then((stream) => {
        videoRef.current!.srcObject = stream;
        videoRef.current!.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  return (
    <div ref={containerRef}>
      <button className="button" onClick={getVideo}>
        getVideo
      </button>
      <video className="video" ref={videoRef} />
      {/* <canvas /> */}
    </div>
  );
}

export default App;
