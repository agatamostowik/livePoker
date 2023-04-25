import { Request, Response } from "express";
import { supabase } from "../db";
import _ from "lodash";

export const meController = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", req.query.userId);

    if (error) {
      res.status(400).json({ status: "error", error: error });
    }

    if (!_.isNull(data)) {
      res.json(data[0]);
    } else {
      res.status(400).json({ status: "error", error: "something went wrong!" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", error: error });
  }
};
