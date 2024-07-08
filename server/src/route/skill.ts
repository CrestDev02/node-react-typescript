import { Router } from 'express';
const skillRouter = Router()
import * as skillController from "../controller/skill";
import passport from 'passport';
// import {authLocal, authJwt} from "../service/passport"

const authCheck = passport.authenticate('jwt', { session: false })

skillRouter.post('/', authCheck, skillController.addSkill);
skillRouter.get('/getByUser', authCheck, skillController.getSkillByUserId);
skillRouter.put('/:skillId' , authCheck, skillController.updateSkill);
skillRouter.delete('/:skillId' , authCheck, skillController.deleteSkill);
// authRouter.get('/alldata' ,authCheck ,authController.allData);

export = skillRouter