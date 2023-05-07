import _ from "lodash";
import { useEffect } from "react";
import { Peer } from "peerjs";
import { useAppDispatch } from "../../redux/store";
import { setMediaStream } from "../../redux/slices/app";
import { getWebRTCUrl, isProduction } from "../../hooks";

export const useWebRTC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const peer = new Peer("player", {
      host: getWebRTCUrl,
      port: 443,
      path: "/peerjs",
      debug: 2,
      secure: isProduction,
      config: {
        iceServers: [
          { url: "stun:stun1.l.google.com:19302" },
          {
            url: "turn:numb.viagenie.ca",
            credential: "muazkh",
            username: "webrtc@live.com",
          },
        ],
      },
      // config: {
      //   iceServers: [
      //     { url: "stun:stun.l.google.com:19302" },
      //     {
      //       url: "turn:192.158.29.39:3478?transport=udp",
      //       credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      //       username: "28224511:1379330808",
      //     },
      //   ],
      // },
    });

    console.log(peer);

    peer.on("error", (error) => {
      console.log("error", error);
    });

    peer.on("connection", () => {
      console.log("connected");
    });

    peer.on("open", () => {
      console.log("Opened connection, calling a dealer...");
      peer.connect("dealer");
    });

    peer.on("disconnected", () => {
      console.log("disconnected to server...");
      peer.reconnect();
    });

    peer.on("call", (call) => {
      call.answer();

      call.on("iceStateChanged", (iceState) => {
        if (iceState === "disconnected") {
          dispatch(setMediaStream(null));
          peer.connect("dealer");
        }
      });

      call.on("stream", (remoteStream) => {
        dispatch(setMediaStream(remoteStream));
      });
    });
  }, []);
};
