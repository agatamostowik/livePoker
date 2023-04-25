import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setVideoIsPlaying } from "../../redux/slices/app";
import * as Styled from "./styles";

export const Video = () => {
  const dispatch = useAppDispatch();
  const mediaStream = useAppSelector((state) => state.app.mediaStream);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (mediaStream) {
      videoRef.current!.srcObject = mediaStream;
      dispatch(setVideoIsPlaying(true));
    }
  }, [mediaStream]);

  return <Styled.Video ref={videoRef} autoPlay />;
};
