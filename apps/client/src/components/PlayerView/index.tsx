import { useEffect, useRef, useState } from "react";
import _, { isUndefined } from "lodash";
import { GameApi, Room } from "../../redux/RTK";
import { useParams } from "react-router-dom";
import { webSocketClient } from "../../webSocket";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import * as Styled from "./styles";
import {
  setAABet,
  setAnteBet,
  setMediaStream,
  setVideoIsPlaying,
} from "../../redux/slices/app";

import { Peer } from "peerjs";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const useWebRTC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const peer = new Peer("player", {
      host: "localhost",
      port: 9000,
      path: "/peerjs",
      config: {
        iceServers: [
          { url: "stun:stun.l.google.com:19302" },

          {
            url: "turn:192.158.29.39:3478?transport=udp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
          {
            url: "turn:192.158.29.39:3478?transport=tcp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
        ],
      },
    });

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
        console.log(iceState);
        if (iceState === "disconnected") {
          dispatch(setMediaStream(null));
          peer.connect("dealer");
        }
      });

      call.on("close", () => {
        console.log("close");
      });

      call.on("error", () => {
        console.log("error");
      });

      call.on("stream", (remoteStream) => {
        console.log(remoteStream);
        dispatch(setMediaStream(remoteStream));
      });
    });
  }, []);
};

const Game = () => {
  useWebRTC();
  const playerId = useAppSelector((state) => state.app.user?.id);

  const { roomId } = useParams();
  const { data: room, isLoading: isRoomLoading } =
    GameApi.endpoints.getRoomById.useQuery(roomId!);
  const { data: game, isLoading: isGameLoading } =
    GameApi.endpoints.getGameByRoomId.useQuery(room ? room.id : skipToken);
  const { data: round, isLoading: isRoundLoading } =
    GameApi.endpoints.getRoundByGameId.useQuery(game ? game.id : skipToken);

  const user = useAppSelector((state) => state.app.user);
  const { data: account } = GameApi.endpoints.getUserAccount.useQuery(
    user?.id!
  );

  const [bet, setBet] = useState<number>();
  const dispatch = useAppDispatch();
  const anteBet = useAppSelector((state) => state.app.roundBet.AnteBet);
  const AABet = useAppSelector((state) => state.app.roundBet.AABet);

  const handleStartGame = () => {
    webSocketClient.emit("startGame", {
      roomId: room?.id,
      playerId: playerId!,
      dealerId: room?.dealer_id!,
    });
  };

  const AABetSum = _.sum(AABet);
  const anteBetSum = _.sum(anteBet);
  const temporaryBalance = account?.balance! - (AABetSum + anteBetSum);

  const makeAnteBet = () => {
    if (bet) {
      const isDisabled = bet > temporaryBalance;

      if (!isDisabled) {
        dispatch(setAnteBet(bet));
      }
    }
  };

  const makeAABet = () => {
    if (bet) {
      const isDisabled = bet > temporaryBalance;

      if (!isDisabled) {
        dispatch(setAABet(bet));
      }
    }
  };
  const chipValues = [0.5, 1, 5, 25, 100, 500];

  return (
    <Styled.Game>
      <Styled.Board>
        {!game ? (
          <Styled.JoinGameButton onClick={handleStartGame}>
            Join Game
          </Styled.JoinGameButton>
        ) : (
          <>
            <Styled.Balance>{temporaryBalance}</Styled.Balance>
            {round && (
              <Styled.ChipsContainer>
                {/* <p>UNDO</p> */}
                {/* <Styled.Chip>UNDO</Styled.Chip> */}
                {chipValues.map((value) => {
                  const isActive = value === bet;
                  const isDisabled = value > temporaryBalance;

                  return (
                    <Styled.ActiveChip
                      key={value}
                      isActive={!isDisabled ? isActive : false}
                    >
                      <Styled.Chip
                        disabled={isDisabled}
                        onClick={() => {
                          setBet(value);
                        }}
                      >
                        {value}
                      </Styled.Chip>
                    </Styled.ActiveChip>
                  );
                })}
                {/* <p>DOUBLE</p> */}
              </Styled.ChipsContainer>
            )}
            <Styled.Buttons>
              <Styled.AAButton onClick={makeAABet}>
                AA
                {AABetSum > 0 && (
                  <Styled.PlacedBetChip>{AABetSum}</Styled.PlacedBetChip>
                )}
              </Styled.AAButton>
              <Styled.AnteButton onClick={makeAnteBet}>
                ANTE
                {anteBetSum > 0 && (
                  <Styled.PlacedBetChip>{anteBetSum}</Styled.PlacedBetChip>
                )}
              </Styled.AnteButton>
            </Styled.Buttons>
          </>
        )}
      </Styled.Board>
    </Styled.Game>
  );
};

const Video = (props: { mediaStream: MediaStream }) => {
  const { mediaStream } = props;

  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current!.srcObject = mediaStream;
    dispatch(setVideoIsPlaying(true));
  }, []);

  return <Styled.Video ref={videoRef} autoPlay muted />;
};

export const PlayerView = () => {
  // const { roomId } = useParams();
  // const {
  //   data: room,
  //   isLoading: isRoomLoading,
  //   isSuccess: isRoomSuccess,
  // } = GameApi.endpoints.getRoomById.useQuery(roomId!);
  // const { data: game, isLoading: isGameLoading } =
  //   GameApi.endpoints.getGameByRoomId.useQuery(room ? room.id : skipToken);
  // const { data: round, isLoading: isRoundLoading } =
  //   GameApi.endpoints.getRoundByGameId.useQuery(game ? game.id : skipToken);

  const mediaStream = useAppSelector((state) => state.app.mediaStream);

  return (
    <Styled.Container>
      <Styled.Test>
        {mediaStream && <Video mediaStream={mediaStream} />}
        <Game />
      </Styled.Test>
    </Styled.Container>
  );
};
