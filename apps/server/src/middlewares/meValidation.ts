import { NextFunction, Request, Response } from "express";
import { meQuerySchema } from "../helpers/validations";

export const meValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Parsing query request: ", req.query);
    meQuerySchema.parse(req.query);
    console.log("Request query matched with schema");

    next();
  } catch (error) {
    console.log("Request query validation failed");
    res.status(500).send("Bad request: incorrect parameters");
  }
};
