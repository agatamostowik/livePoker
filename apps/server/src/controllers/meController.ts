import { Request, Response } from "express";

export const meController = async (req: Request, res: Response) => {
  const user = await req.user;

  console.log(user);

  res.json(user);
};
