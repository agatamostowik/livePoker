import { Request, Response } from "express";
import { supabase } from "../db";
import _ from "lodash";

export const updateRoomController = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("rooms")
      .update({
        ...(req.body.name && { name: req.body.name }),
        ...(req.body.dealer && { dealer: req.body.dealer }),
        ...(req.body.streamAddress && {
          stream_address: req.body.streamAddress,
        }),
      })
      .eq("id", req.params.roomId)
      .select("*");

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
