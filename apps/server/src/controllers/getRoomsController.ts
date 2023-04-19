import { Request, Response } from "express";
import _ from "lodash";
import { supabase } from "../db";

export const getRoomsController = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("rooms").select("*");

    if (error) {
      res.status(400).json({ status: "error", error: error });
    }

    if (data) {
      res.json(data);
    }
  } catch (error) {
    res.status(400).json({ status: "error", error: error });
  }
};
