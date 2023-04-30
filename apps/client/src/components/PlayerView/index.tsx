import { useEffect, useMemo, useRef, useState } from "react";
import { Peer } from "peerjs";
import _ from "lodash";
import { GameApi } from "../../redux/RTK";
import { webSocketClient } from "../../webSocket";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setMediaStream, setVideoIsPlaying } from "../../redux/slices/app";
import { Cards } from "../Cards";
import { Video } from "../Video";
import { Chip } from "../Chip";
import * as Styled from "./styles";
import { setBet } from "../../redux/slices/round";

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
        dispatch(setMediaStream(remoteStream));
      });
    });
  }, []);
};

const Buttons = () => {
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);
  const account = useAppSelector((state) => state.auth.account);
  const bet = useAppSelector((state) => state.round.bet);

  const AABetSum = _.sum(round?.aa_bet);
  const anteBetSum = _.sum(round?.ante_bet);
  const temporaryBalance = account?.balance! - (AABetSum + anteBetSum);

  const isDisabled =
    round === null ||
    round?.bets_over ||
    bet === null ||
    bet > temporaryBalance;

  const makeAnteBet = () => {
    if (bet) {
      if (!isDisabled) {
        webSocketClient.emit("MESSAGE", {
          type: "ANTE_BET",
          payload: {
            bet,
            roundId: round?.id,
            gameId: game?.id,
          },
        });
      }
    }
  };

  const makeAABet = () => {
    if (bet) {
      if (!isDisabled) {
        webSocketClient.emit("MESSAGE", {
          type: "AA_BET",
          payload: {
            bet,
            roundId: round?.id,
            gameId: game?.id,
          },
        });
      }
    }
  };

  return (
    <Styled.Buttons>
      <Styled.Tray disabled={isDisabled} onClick={makeAABet}>
        AA
        {AABetSum > 0 && (
          <Styled.Chip>
            <Chip value={5} />
            <Styled.ChipValue>{AABetSum}</Styled.ChipValue>
          </Styled.Chip>
        )}
      </Styled.Tray>
      <Styled.Tray disabled={isDisabled} onClick={makeAnteBet}>
        ANTE
        {anteBetSum > 0 && (
          <Styled.Chip>
            <Chip value={5} />
            <Styled.ChipValue>{anteBetSum}</Styled.ChipValue>
          </Styled.Chip>
        )}
      </Styled.Tray>
      <Styled.Tray disabled>
        Play
        {round?.play_bet && (
          <Styled.Chip>
            <Chip value={5} />
            <Styled.ChipValue>{round.play_bet}</Styled.ChipValue>
          </Styled.Chip>
        )}
      </Styled.Tray>
    </Styled.Buttons>
  );
};

const Bet = (props: { disabled: boolean; value: number }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (props.disabled) {
      return;
    }
    dispatch(setBet(props.value));
  };

  return (
    <Styled.Chip onClick={handleClick}>
      <Chip value={props.value} />
      <Styled.ChipValue>{props.value}</Styled.ChipValue>
    </Styled.Chip>
  );
};

const Bets = () => {
  const round = useAppSelector((state) => state.round.data);
  const account = useAppSelector((state) => state.auth.account);
  const bet = useAppSelector((state) => state.round.bet);

  const AABetSum = _.sum(round?.aa_bet);
  const anteBetSum = _.sum(round?.ante_bet);
  const temporaryBalance = account?.balance! - (AABetSum + anteBetSum);

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
            <Bet disabled={isDisabled} value={value} />
          </Styled.ActiveChip>
        );
      })}
    </Styled.ChipsContainer>
  );
};

const PlayOrPass = () => {
  const round = useAppSelector((state) => state.round.data);

  const handlePlay = () => {
    webSocketClient.emit("playBet", {
      roundId: round?.id,
    });
  };

  return (
    <Styled.PlayOrPassContainer>
      <Styled.Title>MAKE YOUR DECISION</Styled.Title>
      <Styled.PlayOrPassButtonsContainer>
        <Styled.PlayOrPassButton onClick={handlePlay} primary>
          PLAY x2
        </Styled.PlayOrPassButton>
        <Styled.PlayOrPassButton>FOLD</Styled.PlayOrPassButton>
      </Styled.PlayOrPassButtonsContainer>
    </Styled.PlayOrPassContainer>
  );
};

const Balance = () => {
  const round = useAppSelector((state) => state.round.data);
  const account = useAppSelector((state) => state.auth.account);

  const AABetSum = _.sum(round?.aa_bet);
  const anteBetSum = _.sum(round?.ante_bet);
  const temporaryBalance = account?.balance! - (AABetSum + anteBetSum);

  return <Styled.Balance>Balance: ${temporaryBalance}</Styled.Balance>;
};

const Game = () => {
  const room = useAppSelector((state) => state.room.data);
  const game = useAppSelector((state) => state.game.data);
  const round = useAppSelector((state) => state.round.data);
  const account = useAppSelector((state) => state.auth.account);

  const handleStartGame = () => {
    webSocketClient.emit("MESSAGE", {
      type: "CREATE_GAME",
      payload: {
        roomId: room?.id,
        dealerId: room?.dealer_id!,
        playerId: account?.id,
      },
    });
  };

  const sumOfPlayedCards = useMemo(() => {
    if (round) {
      return (
        round?.dealer_cards.length +
        round?.player_cards.length +
        round?.common_cards.length
      );
    } else {
      return 0;
    }
  }, [round]);

  return (
    <Styled.Game>
      <Styled.Board>
        {!game ? (
          <Styled.JoinGameButton onClick={handleStartGame}>
            Join Game
          </Styled.JoinGameButton>
        ) : (
          <>
            <Balance />
            {round?.bets_over == false && <Bets />}

            {sumOfPlayedCards === 7 && round?.play_bet === null && (
              <PlayOrPass />
            )}

            <Cards />
            <Buttons />
          </>
        )}
      </Styled.Board>
    </Styled.Game>
  );
};

export const PlayerView = () => {
  useWebRTC();
  const mediaStream = useAppSelector((state) => state.app.mediaStream);

  return (
    <Styled.Container>
      {mediaStream && (
        <Styled.Wrapper>
          <Video />
          <Game />
        </Styled.Wrapper>
      )}
    </Styled.Container>
  );
};
