import { Router } from 'express';
const certificationRouter = Router()
import * as certificationController from "../controller/certification";
import passport from 'passport';
import upload from '../service/upload';

const authCheck = passport.authenticate('jwt', { session: false })

certificationRouter.post('/', authCheck, upload.single('certificate'), certificationController.addCertification);
certificationRouter.get('/getByUser', authCheck, certificationController.getCertificationByUserId);
certificationRouter.put('/:certificationId', upload.single('certificate'), authCheck, certificationController.updateCertification);
certificationRouter.delete('/:certificationId' , authCheck, certificationController.deleteCertification);
// authRouter.get('/alldata' ,authCheck ,authController.allData);

export = certificationRouter