import { useEffect, useRef, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useParams } from "react-router-dom";
import { Peer } from "peerjs";
import _ from "lodash";
import { GameApi } from "../../redux/RTK";
import { webSocketClient } from "../../webSocket";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setMediaStream, setVideoIsPlaying } from "../../redux/slices/app";
import * as Styled from "./styles";
import { Cards } from "../Cards";
import {
  useGetGameByRoomIdOnMount,
  useGetRoomOnMount,
  useGetRoundByGameIdOnMount,
} from "../../hooks";
import { Video } from "../Video";

const useWebRTC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const peer = new Peer("player", {
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

const Buttons = (props: any) => {
  const { bet, temporaryBalance, AABetSum, anteBetSum } = props;

  const { roomId } = useParams();
  const { data: room } = GameApi.endpoints.getRoomById.useQuery(roomId!);
  const { data: game } = GameApi.endpoints.getGameByRoomId.useQuery(
    room ? room.id : skipToken
  );
  const { data: round } = GameApi.endpoints.getRoundByGameId.useQuery(
    game ? game.id : skipToken
  );

  const makeAnteBet = () => {
    if (bet) {
      const isDisabled = bet > temporaryBalance;

      if (!isDisabled) {
        webSocketClient.emit("makeAnteBet", {
          anteBet: bet,
          roundId: round?.id,
          gameId: game?.id,
        });
      }
    }
  };

  const makeAABet = () => {
    if (bet) {
      const isDisabled = bet > temporaryBalance;

      if (!isDisabled) {
        webSocketClient.emit("makeAABet", {
          aaBet: bet,
          roundId: round?.id,
          gameId: game?.id,
        });
      }
    }
  };

  return (
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
      <Styled.AnteButton>Play</Styled.AnteButton>
    </Styled.Buttons>
  );
};

const Bets = (props: any) => {
  const { bet, temporaryBalance, setBet } = props;

  return (
    <Styled.ChipsContainer>
      {[0.5, 1, 5, 25, 100, 500].map((value) => {
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
    </Styled.ChipsContainer>
  );
};

const Game = () => {
  const { roomId } = useParams();
  const { data: room } = GameApi.endpoints.getRoomById.useQuery(roomId!);
  const { data: game } = GameApi.endpoints.getGameByRoomId.useQuery(
    room ? room.id : skipToken
  );
  const { data: round } = GameApi.endpoints.getRoundByGameId.useQuery(
    game ? game.id : skipToken
  );
  const user = useAppSelector((state) => state.app.user);
  const { data: account } = GameApi.endpoints.getUserAccount.useQuery(
    user?.id!
  );

  const [bet, setBet] = useState<number>();

  const handleStartGame = () => {
    webSocketClient.emit("startGame", {
      roomId: room?.id,
      playerId: user?.id,
      dealerId: room?.dealer_id!,
    });
  };

  const AABetSum = _.sum(round?.aa_bet);
  const anteBetSum = _.sum(round?.ante_bet);
  const temporaryBalance = account?.balance! - (AABetSum + anteBetSum);

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
            {round && round?.bets_over == false && (
              <Bets temporaryBalance={temporaryBalance} setBet={setBet} />
            )}

            <Cards />
            <Buttons
              bet={bet}
              temporaryBalance={temporaryBalance}
              AABetSum={AABetSum}
              anteBetSum={anteBetSum}
            />
          </>
        )}
      </Styled.Board>
    </Styled.Game>
  );
};

export const PlayerView = () => {
  useWebRTC();
  useGetRoomOnMount();
  useGetGameByRoomIdOnMount();
  useGetRoundByGameIdOnMount();

  return (
    <Styled.Container>
      <Styled.Test>
        <Video />
        <Game />
      </Styled.Test>
    </Styled.Container>
  );
};
