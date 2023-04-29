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
      host: "localhost",
      port: 9000,
      path: "/peerjs",
      // config: {
      //   iceServers: [
      //     { url: "stun:stun.l.google.com:19302" },
      //     {
      //       url: "turn:192.158.29.39:3478?transport=udp",
      //       credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      //       username: "28224511:1379330808",
      //     },
      //     {
      //       url: "turn:192.158.29.39:3478?transport=tcp",
      //       credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      //       username: "28224511:1379330808",
      //     },
      //   ],
      // },
    });

    peer.on("error", (error) => {
      console.log("error", error);
    });

    peer.on("connection", (qwe) => {
      peer.call("player", mediaStream);
      dispatch(setIsPlayerConnected(true));
    });

    peer.on("open", () => {
      peer.call("player", mediaStream);
      console.log("opened");
    });

    peer.on("disconnected", () => {
      peer.reconnect();
      console.log("disconnected");
    });
  }, []);
};
