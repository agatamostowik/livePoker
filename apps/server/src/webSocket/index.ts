import { Server, Socket } from "socket.io";
import { supabase } from "../db";
import _ from "lodash";
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

export const webSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.emit("HANDSHAKE");

    socket.on("createRoom", async (params) => {
      const { data, error } = await supabase
        .from("rooms")
        .insert([{ name: params.name, dealer_id: params.dealerId }])
        .select("*");

      if (error) {
        console.error(error);
      }

      if (data) {
        socket.emit("roomCreated", data[0]);
        socket.broadcast.emit("roomCreated", data[0]);
      }
    });

    socket.on("startGame", async (params) => {
      const { data, error } = await supabase
        .from("games")
        .insert([
          {
            room_id: params.roomId,
            player_id: params.playerId,
            dealer_id: params.dealerId,
            game_over: false,
          },
        ])
        .select("*");

      if (error) {
        console.error(error);
      }

      if (data) {
        socket.emit("gameStarted", data[0]);
        socket.broadcast.emit("gameStarted", data[0]);
      }
    });

    socket.on("startBetting", async (params) => {
      const { data, error } = await supabase
        .from("rounds")
        .insert([
          {
            room_id: params.roomId,
            player_id: params.playerId,
            game_id: params.gameId,
          },
        ])
        .select("*");

      if (error) {
        console.error(error);
      }

      if (data) {
        socket.emit("bettingStarted", data[0]);
        socket.broadcast.emit("bettingStarted", data[0]);
      }
    });

    socket.on(
      "makeAnteBet",
      async (params: { roundId: string; gameId: string; anteBet: number }) => {
        const { roundId, gameId, anteBet } = params;

        const { data: initialRound } = await supabase
          .from("rounds")
          .select("ante_bet")
          .eq("id", roundId);

        const ante_bet = initialRound?.[0].ante_bet;

        const { data: updatedRound, error } = await supabase
          .from("rounds")
          .update({
            ante_bet: [...ante_bet, anteBet],
          })
          .eq("id", roundId)
          .select("*");

        if (error) {
          console.error(error);
        }

        if (updatedRound) {
          socket.emit("madeAnteBet", updatedRound[0]);
          socket.broadcast.emit("madeAnteBet", updatedRound[0]);
        }
      }
    );

    socket.on(
      "stopBetting",
      async (params: { roundId: string; playerId: string; gameId: string }) => {
        const { roundId, playerId, gameId } = params;

        // set bets_over to true
        const { data: round } = await supabase
          .from("rounds")
          .update({
            bets_over: true,
          })
          .eq("id", roundId)
          .select("*");

        // finish game if player if the player doesn't bet
        // if (round?.[0].ante_bet.length === 0) {
        //   await supabase
        //     .from("games")
        //     .update({
        //       game_over: true,
        //     })
        //     .eq("id", gameId);

        //   await supabase
        //     .from("rounds")
        //     .update({
        //       is_active: false,
        //     })
        //     .eq("id", roundId);
        // }

        // fetch account for actual balance value
        const { data: account } = await supabase
          .from("accounts")
          .select("*")
          .eq("user_id", playerId);

        // update the account balance column by subtracting bets from the account balance value
        const { data: updatedAccount } = await supabase
          .from("accounts")
          .update({
            balance: account?.[0].balance - _.sum(round?.[0].ante_bet),
          })
          .eq("user_id", playerId)
          .select("*");

        socket.emit("bettingStopped", round?.[0]);
        socket.broadcast.emit("bettingStopped", round?.[0]);
      }
    );

    socket.on("showCards", async (roundId) => {
      const { data: round } = await supabase
        .from("rounds")
        .select("*")
        .eq("id", roundId);

      const dealer = drawTwoCards(round?.[0].cards); // [null, null]
      const common = drawThreeCards(dealer.cards); // [null, null, null]
      const player = drawTwoCards(common.cards); // [null, null]

      await supabase
        .from("rounds")
        .update({
          dealer_cards: dealer.drawnCards,
          common_cards: common.drawnCards,
          player_cards: player.drawnCards,
          cards: player.cards,
        })
        .eq("id", roundId);

      dealer.drawnCards.forEach((card, index) => {
        setTimeout(() => {
          socket.emit(`playDealerCard`, card);
        }, (0 + index) * 600);
      });

      common.drawnCards.forEach((card, index) => {
        setTimeout(() => {
          socket.emit(`playCommonCard`, card);
        }, (2 + index) * 600);
      });

      player.drawnCards.forEach((card, index) => {
        setTimeout(() => {
          socket.emit(`playPlayerCard`, card);
        }, (5 + index) * 600);
      });
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

    socket.on("playTurnAndRiverCard", async (params) => {
      const { data: initialRoundState } = await supabase
        .from("rounds")
        .select("*")
        .eq("id", params.roundId);

      const { drawnCards, cards } = drawTwoCards(initialRoundState?.[0].cards);

      await supabase
        .from("rounds")
        .update({
          cards: cards,
          common_cards: [...initialRoundState?.[0].common_cards, ...drawnCards],
        })
        .eq("id", params.roundId)
        .select("*");

      drawnCards.forEach((card, index) => {
        setTimeout(() => {
          socket.emit(`playCommonCard`, card);
        }, (0 + index) * 600);
      });
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
