import { Request, Response } from "express";
import _ from "lodash";
import { supabase } from "../db";

export const getRoomsController = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("rooms").select("*");

    if (error) {
      res.status(400).json({ status: "error", error: error });
    }

    if (!_.isNull(data)) {
      res.json(data);
    } else {
      res.status(400).json({ status: "error", error: "something went wrong!" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", error: error });
  }
};
