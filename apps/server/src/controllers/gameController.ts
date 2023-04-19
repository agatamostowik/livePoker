import { Request, Response } from "express";
import { supabase } from "../db";

type Room = {
  id: string;
  created_at: string;
  name: string;
  dealer: string;
};

export const gameController = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("games")
      .insert([
        {
          room_id: req.params.roomId,
          player_id: req.body.playerId,
          dealer_id: req.body.dealerId,
          game_over: false,
        },
      ])
      .select("*");

    if (error) {
      res.status(400).json({ status: "error", error: error });
    }

    if (data) {
      res.json(data[0]);
    }
  } catch (error) {
    res.status(400).json({ status: "error", error: error });
  }
};
