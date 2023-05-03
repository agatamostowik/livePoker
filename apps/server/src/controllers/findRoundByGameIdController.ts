import { Request, Response } from "express";
import _ from "lodash";
import { supabase } from "../db";

export const findRoundByGameIdController = async (
  req: Request,
  res: Response
) => {
  const { gameId } = req.query;

  try {
    const { data, error } = await supabase.from("rounds").select("*").match({
      game_id: gameId,
      round_over: false,
    });

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
