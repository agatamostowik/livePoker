import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const validateSignInMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Parsing body request: ", req.body);
    bodySchema.parse(req.body);
    console.log("Request body matched with schema");
    next();
  } catch (error) {
    console.log("Request body validation failed");
    res.status(500).send("Bad request: incorrect parameters");
  }
};
