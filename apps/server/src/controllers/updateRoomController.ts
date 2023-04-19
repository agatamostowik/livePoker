import { Request, Response } from "express";
import { supabase } from "../db";

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

    if (data) {
      res.json(data[0]);
    }
  } catch (error) {
    res.status(400).json({ status: "error", error: error });
  }
};
