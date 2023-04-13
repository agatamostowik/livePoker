import { Request, Response } from "express";
import _ from "lodash";

export const signInController = async (req: Request, res: Response) => {
  const user = await req.user;

  console.log(user);

  res.json(_.omit(user, "password"));
};
