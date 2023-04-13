import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy } from "passport-local";
import { getUserByEmail } from "../models";
// import { ps } from "../passport";
import bcrypt from "bcrypt";

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, next) => {
      const user = await getUserByEmail(email);

      if (user) {
        const isAuthenticated = await bcrypt.compare(password, user.password);

        if (isAuthenticated) {
          return next(null, user);
        } else {
          return next(null, false, { message: "Password incorrect" });
        }
      } else {
        return next(null, false, { message: "Email incorrect" });
      }
    }
  )
);

export const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return passport.authenticate("local")(req, res, next);
};
