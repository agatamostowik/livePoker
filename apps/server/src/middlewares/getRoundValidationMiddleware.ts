import { NextFunction, Request, Response } from "express";
import { getRoundParamsSchema } from "../helpers/validations";

export const getRoundValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Parsing params request: ", req.params);
    getRoundParamsSchema.parse(req.params);
    console.log("Request params matched with schema");

    next();
  } catch (error) {
    console.log("Request params validation failed");
    res.status(500).send("Bad request: incorrect parameters");
  }
};
