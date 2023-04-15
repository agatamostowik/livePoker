import { Request, Response } from "express";
import { supabase } from "../db";
import _ from "lodash";

export const getRoomsController = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from("rooms").select("*");

  if (error) {
    res.status(400).json({ status: "error", error: error });
  }

  if (!_.isNull(data)) {
    res.json(data);
  } else {
    res.status(400).json({ status: "error", error: "something went wrong!" });
  }
};
