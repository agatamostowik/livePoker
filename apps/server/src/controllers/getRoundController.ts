import { Request, Response } from "express";
import _ from "lodash";
import { supabase } from "../db";

export const getRoundController = async (req: Request, res: Response) => {
  const { roundId } = req.params;
  try {
    const { data, error } = await supabase
      .from("rounds")
      .select("*")
      .eq("id", roundId);

    if (error) {
      res.status(400).json({ status: "error", error: error });
    }

    if (!_.isNull(data)) {
      const response = _.isEmpty(data) ? null : data[0];

      res.json(response);
    } else {
      res.status(400).json({ status: "error", error: "something went wrong!" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", error: error });
  }
};
