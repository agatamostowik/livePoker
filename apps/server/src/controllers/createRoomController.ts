import { Request, Response } from "express";
import { supabase } from "../db";
import { webSocketSession } from "../..";

export const createRoomController = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("rooms")
    .insert([{ name: req.body.name, dealer: req.body.dealer }])
    .select("*");

  if (error) {
    res.status(400).json({ status: "error", error: error });
  }

  if (data) {
    webSocketSession.emit("roomCreated", data[0]);
    res.json({ status: "ok" });
  } else {
    res.status(400).json({ status: "error", error: "something went wrong!" });
  }
};
