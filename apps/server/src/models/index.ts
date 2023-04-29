import _ from "lodash";
import { supabase } from "../db";

export const createRoom = async (params: {
  name: string;
  dealerId: string;
}) => {
  const { name, dealerId } = params;

  try {
    const { data, error } = await supabase
      .from("rooms")
      .insert([{ name: name, dealer_id: dealerId }])
      .select("*");

    if (error) {
      console.error(error);
    }

    if (!_.isNull(data) && !_.isEmpty(data)) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createGame = async (params: {
  roomId: string;
  playerId: string;
  dealerId: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("games")
      .insert([
        {
          room_id: params.roomId,
          player_id: params.playerId,
          dealer_id: params.dealerId,
        },
      ])
      .select("*");

    if (error) {
      console.error(error);
    }

    if (!_.isNull(data) && !_.isEmpty(data)) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateGame = async (gameId: string, params: unknown) => {
  try {
    const { data, error } = await supabase
      .from("games")
      .update(params)
      .eq("id", gameId)
      .select("*");

    if (error) {
      console.error(error);
    }

    if (!_.isNull(data) && !_.isEmpty(data)) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createRound = async (params: {
  roomId: string;
  playerId: string;
  gameId: string;
}) => {
  const { roomId, playerId, gameId } = params;

  try {
    const { data, error } = await supabase
      .from("rounds")
      .insert([
        {
          room_id: roomId,
          player_id: playerId,
          game_id: gameId,
        },
      ])
      .select("*");

    if (error) {
      console.error(error);
    }

    if (!_.isNull(data) && !_.isEmpty(data)) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateRound = async (roundId: string, params: unknown) => {
  try {
    const { data, error } = await supabase
      .from("rounds")
      .update(params)
      .eq("id", roundId)
      .select("*");

    if (error) {
      console.error(error);
    }

    if (!_.isNull(data) && !_.isEmpty(data)) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAccount = async (accountId: string) => {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", accountId);

    if (error) {
      console.error(error);
    }

    if (!_.isNull(data) && !_.isEmpty(data)) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateAccount = async (accountId: string, params: unknown) => {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .update(params)
      .eq("user_id", accountId)
      .select("*");

    if (error) {
      console.error(error);
    }

    if (!_.isNull(data) && !_.isEmpty(data)) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRound = async (roundId: string) => {
  try {
    const { data, error } = await supabase
      .from("rounds")
      .select("*")
      .eq("id", roundId);

    if (error) {
      console.error(error);
    }

    if (!_.isNull(data) && !_.isEmpty(data)) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
