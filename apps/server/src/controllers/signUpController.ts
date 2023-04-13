import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { createUser } from "../models";

const saltRounds = 10;

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const encryptedUser = { ...req.body, password: hashedPassword };

  try {
    const user = await createUser(encryptedUser);

    req.login(user, (error) => {
      if (error) {
        console.log(error);
      }

      res.json(user);
    });
  } catch (error) {
    next(error);
  }
};
