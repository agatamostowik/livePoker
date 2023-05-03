import _ from "lodash";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { setIsPlayerConnected, setMediaStream } from "../../redux/slices/app";
import { Peer } from "peerjs";
import { useAppSelector } from "../../redux/store";

export const useMediaStream = () => {
  const dispatch = useAppDispatch();

  const getMediaStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      dispatch(setMediaStream(mediaStream));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMediaStream();
  }, []);
};

export const useWebRTC = () => {
  const dispatch = useAppDispatch();
  const mediaStream = useAppSelector((state) => state.app.mediaStream)!;

  useEffect(() => {
    const peer = new Peer("dealer", {
      host:
        !process.env.NODE_ENV || process.env.NODE_ENV === "development"
          ? "localhost"
          : "livepokerbe-production.up.railway.app",
      port: 9000,
      path: "/peerjs",
    });

    peer.on("open", () => {
      peer.call("player", mediaStream);
      console.log("opened");
    });

    // peer.on("error", (error) => {
    //   console.log("error", error);
    // });

    peer.on("connection", (qwe) => {
      peer.call("player", mediaStream);
      dispatch(setIsPlayerConnected(true));
    });

    peer.on("disconnected", () => {
      peer.reconnect();
      console.log("disconnected");
    });
  }, []);
};
