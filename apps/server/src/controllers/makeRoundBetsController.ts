import { Request, Response } from "express";
import _ from "lodash";
import { supabase } from "../db";

export const makeRoundBetsController = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    // const { data, error } = await supabase
    //   .from("rounds")
    //   .update({
    //   })
    //   .eq("id", req.params.roundId);
    //   .select("*")
    // if (error) {
    //   res.status(400).json({ status: "error", error: error });
    // }
    // if (!_.isNull(data)) {
    //   res.json(data[0]);
    // }
  } catch (error) {
    res.status(400).json({ status: "error", error: error });
  }
};
