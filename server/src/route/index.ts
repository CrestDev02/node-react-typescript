import { Router } from 'express';
import authRouter from "./auth";
import experienceRouter from "./experience";
import skillRouter from "./skill";
import userRouter from "./user";
import certificationRouter from "./certification";

const allRouter = Router()

allRouter.use('/auth',authRouter)
allRouter.use('/experience',experienceRouter)
allRouter.use('/skill',skillRouter)
allRouter.use('/user',userRouter)
allRouter.use('/certification',certificationRouter)

export = allRouter