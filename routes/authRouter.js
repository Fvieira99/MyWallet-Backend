import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import validSignIn from "../middlewares/signInMiddleware.js";
import validSignUp from "../middlewares/signUpMiddleware.js";

const authRouter = Router();

authRouter.post("/signin", validSignIn, signIn);
authRouter.post("/signup", validSignUp, signUp);

export default authRouter;
