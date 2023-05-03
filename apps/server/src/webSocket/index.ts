import _ from "lodash";
import http from "http";
import { Server, Socket } from "socket.io";
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
import { Message } from "./types";
import {
  drawThreeCards,
  drawTwoCards,
  formatCardNames,
  trim,
} from "../helpers";
// @ts-ignore
import pokersolver from "pokersolver";
import { origin } from "../../index";
import { AAPayTable, antePayTable } from "../helpers/payTables";

export const webSocket = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin,
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.emit("HANDSHAKE");

    socket.on("MESSAGE", async (message: Message) => {
      switch (message.type) {
        case "CREATE_ROOM": {
          const room = await createRoom({
            name: message.payload.name,
            dealer_id: message.payload.dealerId,
          });

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
              round_over: false,
            });

            socket.emit("MESSAGE", {
              type: "GAME_OVER",
            });
            socket.broadcast.emit("MESSAGE", {
              type: "GAME_OVER",
            });
          } else {
            const playerAccount = await getAccount(message.payload.playerId);
            const account = await updateAccount(message.payload.playerId, {
              balance:
                playerAccount?.balance -
                (_.sum(round?.ante_bet) + _.sum(round?.aa_bet)),
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
        case "PLAY_BET": {
          const initialRound = await getRound(message.payload.roundId);

          const anteBet = initialRound?.ante_bet;
          const playBet = _.sum(anteBet) * 2;

          const round = await updateRound(message.payload.roundId, {
            play_bet: playBet,
          });

          if (round) {
            socket.emit("MESSAGE", {
              type: "MADE_PLAY_BET",
              payload: {
                round,
              },
            });
            socket.broadcast.emit("MESSAGE", {
              type: "MADE_PLAY_BET",
              payload: {
                round,
              },
            });
          }

          break;
        }
        case "FOLD": {
          await updateGame(message.payload.gameId, {
            game_over: true,
          });
          await updateRound(message.payload.roundId, {
            round_over: false,
          });

          socket.emit("MESSAGE", {
            type: "GAME_OVER",
          });
          socket.broadcast.emit("MESSAGE", {
            type: "GAME_OVER",
          });

          break;
        }
        case "PLAY_TURN_RIVER_CARDS": {
          const round = await getRound(message.payload.roundId);

          const { drawnCards, cards } = drawTwoCards(round?.cards);

          await updateRound(message.payload.roundId, {
            cards: cards,
            common_cards: [...round?.common_cards, ...drawnCards],
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
        case "EVALUATE_HANDS": {
          const { roundId, playerId } = message.payload;

          const Hand = pokersolver.Hand;
          const round = await getRound(roundId);
          const dealerCards = formatCardNames(round?.dealer_cards);
          const commonCards = formatCardNames(round?.common_cards);
          const playerCards = formatCardNames(round?.player_cards);

          const playerCommon = [...playerCards, ...commonCards];
          const dealerCommon = [...dealerCards, ...commonCards];

          const playerHand = Hand.solve(playerCommon);
          const dealerHand = Hand.solve(dealerCommon);
          playerHand.role = "player";
          dealerHand.role = "dealer";

          const winnerHand = Hand.winners([playerHand, dealerHand]);

          // Dealer doesn't qualify
          // The Ante bet is paid out according to the payout table, but the Play and AA bet are returned.
          if (
            dealerHand.descr === "Pair, 2's" ||
            dealerHand.descr === "Pair, 3's"
          ) {
            const AAWin = _.sum(round?.aa_bet);
            const playWin = round?.play_bet;
            const anteWin =
              _.sum(round?.ante_bet) +
              _.sum(round?.ante_bet) * antePayTable[trim(playerHand.descr)];

            const playerAccount = await getAccount(playerId);

            const newBalance =
              playerAccount?.balance + anteWin + AAWin + playWin;

            const updatedAccount = await updateAccount(playerId, {
              balance: newBalance,
            });

            const updatedRound = await updateRound(roundId, {
              round_over: true,
            });

            socket.emit("MESSAGE", {
              type: "ROUND_OVER",
              payload: {
                winner: "player",
                winner_hand: "Dealer doesn't qualify",
                round: updatedRound,
                account: updatedAccount,
              },
            });
            socket.broadcast.emit("MESSAGE", {
              type: "ROUND_OVER",
              payload: {
                winner: "player",
                winner_hand: "Dealer doesn't qualify",
                round: updatedRound,
                account: updatedAccount,
              },
            });

            break;
          }

          if (winnerHand[0].role === "player") {
            const playWin = round?.play_bet * 2;
            const AAWin =
              _.sum(round?.aa_bet) +
              _.sum(round?.aa_bet) * AAPayTable[trim(playerHand.descr)];
            const anteWin =
              _.sum(round?.ante_bet) +
              _.sum(round?.ante_bet) * antePayTable[trim(playerHand.descr)];

            const playerAccount = await getAccount(playerId);

            const newBalance =
              playerAccount?.balance + anteWin + AAWin + playWin;

            const updatedAccount = await updateAccount(playerId, {
              balance: newBalance,
            });

            const updatedRound = await updateRound(roundId, {
              round_over: true,
            });

            socket.emit("MESSAGE", {
              type: "ROUND_OVER",
              payload: {
                winner: "player",
                winner_hand: playerHand.descr,
                round: updatedRound,
                account: updatedAccount,
              },
            });
            socket.broadcast.emit("MESSAGE", {
              type: "ROUND_OVER",
              payload: {
                winner: "player",
                winner_hand: playerHand.descr,
                round: updatedRound,
                account: updatedAccount,
              },
            });

            break;
          }

          if (winnerHand[0].role === "dealer") {
            const account = await getAccount(playerId);
            const updatedRound = await updateRound(roundId, {
              round_over: true,
            });

            socket.emit("MESSAGE", {
              type: "ROUND_OVER",
              payload: {
                winner: "dealer",
                winner_hand: dealerHand.descr,
                round: updatedRound,
                account: account,
              },
            });
            socket.broadcast.emit("MESSAGE", {
              type: "ROUND_OVER",
              payload: {
                winner: "dealer",
                winner_hand: dealerHand.descr,
                round: updatedRound,
                account: account,
              },
            });

            break;
          }
        }
      }
    });
  });

  return io;
};
