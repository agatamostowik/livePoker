import { NextFunction, Request, Response } from "express";

export const validateCreateRoomMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};
