import _ from "lodash";
import { Server, Socket } from "socket.io";
import { supabase } from "../db";
import {
  createGame,
  createRoom,
  createRound,
  getAccount,
  getRound,
  updateAccount,
  updateGame,
  updateRound,
} from "../models";
// @ts-ignore
import pokersolver from "pokersolver";

function drawCard(initialCards: string[]) {
  const drawnCard =
    initialCards[Math.floor(Math.random() * initialCards.length)];
  const cards = initialCards.filter((cart) => cart !== drawnCard);

  return { drawnCard, cards };
}

const drawTwoCards = (cards: string[]) => {
  const { drawnCard: firstCard, cards: firstDrawCards } = drawCard(cards);
  const { drawnCard: secondCard, cards: restCards } = drawCard(firstDrawCards);

  return { drawnCards: [firstCard, secondCard], cards: restCards };
};

const drawThreeCards = (cards: string[]) => {
  const { drawnCard: firstCard, cards: firstDrawCards } = drawCard(cards);
  const { drawnCard: secondCard, cards: secondDrawCards } =
    drawCard(firstDrawCards);
  const { drawnCard: thirdCard, cards: restCards } = drawCard(secondDrawCards);

  return { drawnCards: [firstCard, secondCard, thirdCard], cards: restCards };
};

type Message =
  | {
      type: "CREATE_ROOM";
      payload: {
        name: string;
        dealerId: string;
      };
    }
  | {
      type: "CREATE_GAME";
      payload: {
        roomId: string;
        dealerId: string;
        playerId: string;
      };
    }
  | {
      type: "CREATE_ROUND";
      payload: {
        roomId: string;
        playerId: string;
        gameId: string;
      };
    }
  | {
      type: "STOP_BETS";
      payload: {
        roundId: string;
        playerId: string;
        gameId: string;
      };
    }
  | {
      type: "ANTE_BET";
      payload: {
        roundId: string;
        bet: number;
      };
    }
  | {
      type: "AA_BET";
      payload: {
        roundId: string;
        bet: number;
      };
    }
  | {
      type: "PLAY_FLOP_CARDS";
      payload: {
        roundId: string;
      };
    }
  | {
      type: "PLAY_TURN_RIVER_CARDS";
      payload: {
        roundId: string;
      };
    };

export const webSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.emit("HANDSHAKE");

    socket.on("MESSAGE", async (message: Message) => {
      switch (message.type) {
        case "CREATE_ROOM": {
          const room = await createRoom(message.payload);

          if (room) {
            socket.emit("MESSAGE", {
              type: "ROOM_CREATED",
              payload: {
                room,
              },
            });
            socket.broadcast.emit("MESSAGE", {
              type: "ROOM_CREATED",
              payload: {
                room,
              },
            });
          }
          break;
        }
        case "CREATE_GAME": {
          const game = await createGame(message.payload);

          if (game) {
            console.log(game);
            socket.emit("MESSAGE", {
              type: "GAME_CREATED",
              payload: {
                game,
              },
            });
            socket.broadcast.emit("MESSAGE", {
              type: "GAME_CREATED",
              payload: {
                game,
              },
            });
          }
          break;
        }
        case "CREATE_ROUND": {
          const round = await createRound(message.payload);

          if (round) {
            socket.emit("MESSAGE", {
              type: "ROUND_CREATED",
              payload: {
                round,
              },
            });
            socket.broadcast.emit("MESSAGE", {
              type: "ROUND_CREATED",
              payload: {
                round,
              },
            });
          }
          break;
        }
        case "STOP_BETS": {
          const round = await updateRound(message.payload.roundId, {
            bets_over: true,
          });

          if (round?.ante_bet.length === 0) {
            await updateGame(message.payload.gameId, {
              game_over: true,
            });
            await updateRound(message.payload.roundId, {
              is_active: false,
            });

            socket.emit("MESSAGE", {
              type: "GAME_OVER",
            });
            socket.broadcast.emit("MESSAGE", {
              type: "GAME_OVER",
            });
          } else {
            const playerIdAccount = await getAccount(message.payload.playerId);
            const account = await updateAccount(message.payload.playerId, {
              balance: playerIdAccount?.balance - _.sum(round?.ante_bet),
            });

            socket.emit("MESSAGE", {
              type: "BETS_STOPED",
              payload: {
                round,
                account,
              },
            });
            socket.broadcast.emit("MESSAGE", {
              type: "BETS_STOPED",
              payload: {
                round,
                account,
              },
            });
          }

          break;
        }
        case "ANTE_BET": {
          const initialRound = await getRound(message.payload.roundId);

          const round = await updateRound(message.payload.roundId, {
            ante_bet: [...initialRound?.ante_bet, message.payload.bet],
          });

          if (round) {
            socket.emit("MESSAGE", {
              type: "MADE_ANTE_BET",
              payload: {
                round,
              },
            });
            socket.broadcast.emit("MESSAGE", {
              type: "MADE_ANTE_BET",
              payload: {
                round,
              },
            });
          }

          break;
        }
        case "AA_BET": {
          const initialRound = await getRound(message.payload.roundId);

          const round = await updateRound(message.payload.roundId, {
            aa_bet: [...initialRound?.aa_bet, message.payload.bet],
          });

          if (round) {
            socket.emit("MESSAGE", {
              type: "MADE_AA_BET",
              payload: {
                round,
              },
            });
            socket.broadcast.emit("MESSAGE", {
              type: "MADE_AA_BET",
              payload: {
                round,
              },
            });
          }

          break;
        }
        case "PLAY_FLOP_CARDS": {
          const round = await getRound(message.payload.roundId);

          const dealer = drawTwoCards(round?.cards);
          const common = drawThreeCards(dealer.cards);
          const player = drawTwoCards(common.cards);

          await updateRound(message.payload.roundId, {
            dealer_cards: dealer.drawnCards,
            common_cards: common.drawnCards,
            player_cards: player.drawnCards,
            cards: player.cards,
          });

          dealer.drawnCards.forEach((card, index) => {
            setTimeout(() => {
              socket.emit("MESSAGE", {
                type: "PLAY_DEALER_CARD",
                payload: {
                  card,
                },
              });
              socket.broadcast.emit("MESSAGE", {
                type: "PLAY_DEALER_CARD",
                payload: {
                  card,
                },
              });
            }, (0 + index) * 600);
          });

          common.drawnCards.forEach((card, index) => {
            setTimeout(() => {
              socket.emit("MESSAGE", {
                type: "PLAY_COMMON_CARD",
                payload: {
                  card,
                },
              });
              socket.broadcast.emit("MESSAGE", {
                type: "PLAY_COMMON_CARD",
                payload: {
                  card,
                },
              });
            }, (2 + index) * 600);
          });

          player.drawnCards.forEach((card, index) => {
            setTimeout(() => {
              socket.emit("MESSAGE", {
                type: "PLAY_PLAYER_CARD",
                payload: {
                  card,
                },
              });
              socket.broadcast.emit("MESSAGE", {
                type: "PLAY_PLAYER_CARD",
                payload: {
                  card,
                },
              });
            }, (5 + index) * 600);
          });

          break;
        }
        case "PLAY_TURN_RIVER_CARDS": {
          const initialRound = await getRound(message.payload.roundId);

          const { drawnCards, cards } = drawTwoCards(initialRound?.cards);

          await updateRound(message.payload.roundId, {
            cards: cards,
            common_cards: [...initialRound?.common_cards, ...drawnCards],
          });

          drawnCards.forEach((card, index) => {
            setTimeout(() => {
              socket.emit("MESSAGE", {
                type: "PLAY_COMMON_CARD",
                payload: {
                  card,
                },
              });
              socket.broadcast.emit("MESSAGE", {
                type: "PLAY_COMMON_CARD",
                payload: {
                  card,
                },
              });
            }, index * 600);
          });

          break;
        }
      }
    });

    socket.on("playBet", async (params) => {
      const { data: initialRoundState } = await supabase
        .from("rounds")
        .select("*")
        .eq("id", params.roundId);

      const anteBet = initialRoundState?.[0].ante_bet;
      const playBet = _.sum(anteBet) * 2;

      const { data: updatedRound } = await supabase
        .from("rounds")
        .update({
          play_bet: playBet,
        })
        .eq("id", params.roundId)
        .select("*");

      if (updatedRound) {
        socket.emit("finishedPlayBet", updatedRound[0]);
        socket.broadcast.emit("finishedPlayBet", updatedRound[0]);
      }
    });

    socket.on("evaluateHands", async (params) => {
      const Hand = pokersolver.Hand;

      const { data: round } = await supabase
        .from("rounds")
        .select("*")
        .eq("id", params.roundId);

      const dealerCards = merge(round?.[0].dealer_cards);
      const commonCards = merge(round?.[0].common_cards);
      const playerCards = merge(round?.[0].player_cards);

      const playerCommon = [...playerCards, ...commonCards];
      const dealerCommon = [...dealerCards, ...commonCards];

      const playerHand = Hand.solve(playerCommon);
      const dealerHand = Hand.solve(dealerCommon);
      playerHand.role = "player";
      dealerHand.role = "dealer";

      const winnerHand = Hand.winners([playerHand, dealerHand]);

      //    // Dealer doesn't qualify
      // if (dealerRank === 0 || dealerRank === 1 && ) {
      //   // return Score.DEALER_NOT_QUALIFY;
      //   // return player.anteBet * 2;
      // }

      // if (winnerHand.length === 2) {
      //   // return player.anteBet * 2 + player.callBet;
      // }

      // Player wins
      // if (winnerHand[0].role === "player") {
      //   // return Score.PLAYER_WIN;
      //   // return player.anteBet * 2 + player.callBet * 2;
      // }

      // Dealer wins
      // if (winnerHand[0].role === "dealer") {
      //   // return Score.DEALER_WIN;
      //   // return 0;
      // }
    });
  });

  return io;
};

function merge(cards: string[]) {
  return cards.map((card) => {
    return card.replace("_", "");
  });
}
