import { NextFunction, Request, Response } from "express";
import { findRoundByGameIdQuerySchema } from "../helpers/validations";

export const findRoundByGameIdValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Parsing query request: ", req.query);
    findRoundByGameIdQuerySchema.parse(req.query);
    console.log("Request query matched with schema");

    next();
  } catch (error) {
    console.log("Request query validation failed");
    res.status(500).send("Bad request: incorrect parameters");
  }
};
