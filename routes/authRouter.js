import { Router } from "express";
import { signUp, signIn, logout } from "../controllers/authController.js";

import validSignIn from "../middlewares/signInMiddleware.js";
import validSignUp from "../middlewares/signUpMiddleware.js";
import validToken from "../middlewares/tokenMiddleware.js";

const authRouter = Router();

authRouter.post("/signin", validSignIn, signIn);
authRouter.post("/signup", validSignUp, signUp);
authRouter.delete("/logout", validToken, logout);
export default authRouter;
