import { Server, Socket } from "socket.io";
import { supabase } from "../db";
import _ from "lodash";

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
        .insert([{ name: params.name, dealer_id: params.dealer_id }])
        .select("*");

      if (data) {
        socket.emit("roomCreated");
        socket.broadcast.emit("roomCreated");
      }
    });

    socket.on("updateRoom", async (params) => {
      const { data, error } = await supabase
        .from("rooms")
        .update({
          stream_address: params.streamAddress,
        })
        .eq("id", params.roomId)
        .select("*");

      if (error) {
        console.error(error);
      }

      if (data) {
        const roomId = data[0].id;

        socket.emit("roomUpdated", roomId);
        socket.broadcast.emit("roomUpdated", roomId);
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
        socket.emit("gameStarted", params.roomId);
        socket.broadcast.emit("gameStarted", params.roomId);
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
        socket.emit("bettingStarted", params.gameId);
        socket.broadcast.emit("bettingStarted", params.gameId);
      }
    });

    socket.on(
      "makeAnteBet",
      async (params: { roundId: string; gameId: string; anteBet: number }) => {
        const { roundId, gameId, anteBet } = params;

        const { data: previousValues } = await supabase
          .from("rounds")
          .select("ante_bet")
          .eq("id", roundId);

        const ante_bet = previousValues?.[0].ante_bet;

        const { data, error } = await supabase
          .from("rounds")
          .update({
            ante_bet: [...ante_bet, anteBet],
          })
          .eq("id", roundId)
          .select("*");

        if (error) {
          console.error(error);
        }

        if (data) {
          socket.emit("madeAnteBet", gameId);
          socket.broadcast.emit("madeAnteBet", gameId);
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
        await supabase
          .from("accounts")
          .update({
            balance: account?.[0].balance - _.sum(round?.[0].ante_bet),
          })
          .eq("user_id", playerId);

        socket.emit("bettingStopped", {
          roundId: roundId,
          playerId: playerId,
          gameId: gameId,
        });
        socket.broadcast.emit("bettingStopped", {
          roundId: roundId,
          playerId: playerId,
          gameId: gameId,
        });
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

      const X = 0;
      dealer.drawnCards.forEach((card, index) => {
        setTimeout(() => {
          socket.emit(`playDealerCard`, card);
        }, (X + index) * 600);
      });

      const Z = 2;
      common.drawnCards.forEach((card, index) => {
        setTimeout(() => {
          socket.emit(`playCommonCard`, card);
        }, (Z + index) * 600);
      });

      const C = 5;
      player.drawnCards.forEach((card, index) => {
        setTimeout(() => {
          socket.emit(`playPlayerCard`, card);
        }, (C + index) * 600);
      });
    });
  });

  return io;
};
