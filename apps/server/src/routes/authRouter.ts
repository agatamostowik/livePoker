import { Router } from "express";
import { signInController } from "../controllers/signInController";
import { signOutController } from "../controllers/signOutController";
import { meController } from "../controllers/meController";
import { validateSignInMiddleware } from "../middlewares/validateSignInMiddleware";
import { validateSignUpMiddleware } from "../middlewares/validateSignUpMiddleware";
import { validateEmailUniquenessMiddleware } from "../middlewares/validateEmailUniquenessMiddleware";
import { authenticateMiddleware } from "../middlewares/authenticateMiddleware";
import { signUpController } from "../controllers/signUpController";

export const authRouter = Router();

authRouter.get("/me", meController);

authRouter.post(
  "/signin",
  validateSignInMiddleware,
  authenticateMiddleware,
  signInController
);

authRouter.post(
  "/signup",
  validateSignUpMiddleware,
  validateEmailUniquenessMiddleware,
  signUpController
);

authRouter.post("/signout", signOutController);
