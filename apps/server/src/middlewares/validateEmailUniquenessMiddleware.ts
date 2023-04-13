import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../models";

export const validateEmailUniquenessMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;

    const result = await getUserByEmail(email);

    if (result) {
      res.status(400).send("Bad Request: User already exists");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
