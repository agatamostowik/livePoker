import { Request, Response } from "express";
import _ from "lodash";
import { supabase } from "../db";

export const createRoomController = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("rooms")
      .insert([{ name: req.body.name, dealer_id: req.body.dealer_id }])
      .select("*");

    if (error) {
      res.status(400).json({ status: "error", error: error });
    }

    if (!_.isNull(data)) {
      res.json(data[0]);
    }
  } catch (error) {
    res.status(400).json({ status: "error", error: error });
  }
};
