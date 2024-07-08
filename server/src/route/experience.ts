import { Router } from 'express';
const experienceRouter = Router()
import * as experienceController from "../controller/experience";
import passport from 'passport';
// import {authLocal, authJwt} from "../service/passport"

const authCheck = passport.authenticate('jwt', { session: false })

experienceRouter.post('/', authCheck, experienceController.addExperience);
experienceRouter.get('/getByUser', authCheck, experienceController.getExperienceByUserId);
experienceRouter.put('/:expId' , authCheck, experienceController.updateExperience);
experienceRouter.delete('/:expId' , authCheck, experienceController.deleteExperience);
// authRouter.get('/alldata' ,authCheck ,authController.allData);

export = experienceRouter