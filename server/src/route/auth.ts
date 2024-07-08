import { Router } from 'express';
const authRouter = Router()
import * as authController from "../controller/auth";

authRouter.post('/signup',authController.signup);
authRouter.post('/login' ,authController.login);

export = authRouter