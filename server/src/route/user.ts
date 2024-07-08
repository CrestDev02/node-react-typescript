import { Router } from 'express';
const userRouter = Router()
import * as userController from "../controller/user";
import passport from 'passport';
import upload from '../service/upload';

const authCheck = passport.authenticate('jwt', { session: false })

userRouter.get('/profile', authCheck, userController.getProfile);
userRouter.get('/profile/:userId', authCheck, userController.getProfileById);
userRouter.get('/all', authCheck, userController.getAllUsers);
userRouter.put('/profile', upload.single('profile_pic'), authCheck, userController.editProfile);
// userRouter.post('/profile',userController.imgTest)
// authRouter.get('/alldata' ,authCheck ,authController.allData);

export = userRouter