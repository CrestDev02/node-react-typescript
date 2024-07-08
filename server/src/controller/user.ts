import { Request, Response } from "express";
import { certificationModel, experienceModel, skillModel } from "../model";
const { userModel } = require("../model");
require('dotenv').config();

interface IUser extends Express.User {
    _id?:string
}

export const getProfile = async (req: Request, res: Response) => {
  try {
    const usr: IUser | undefined = req.user
    let profile:any = {}

    const user = await userModel.findOne({_id:usr?._id})
    profile['user'] = user

    const experience = await experienceModel.find({userId:usr?._id})
    profile['experience'] = experience

    const skill = await skillModel.find({userId:usr?._id})
    profile['skill'] = skill

    const certification = await certificationModel.find({userId:usr?._id})
    profile['certification'] = certification

    res.status(200).json({ status: 200, data: profile });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};

export const editProfile = async (req: Request, res: Response) => {
  try {
    const usr: IUser | undefined = req.user
    const body = req.body
    if(req.file){
        body.profile_pic = process.env.DOCS_URL + req.file.fieldname + '/' + req.file.filename
    }
    let user = await userModel.findOneAndUpdate({_id:usr?._id},{...req.body},{new:true})
    res.status(200).json({ status: 200, data: user });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const usr: IUser | undefined = req.user
    let users = await userModel.find({_id:{$ne:usr?._id}})
    res.status(200).json({ status: 200, data: users });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};

export const getProfileById = async (req: Request, res: Response) => {
  try {
    let profile:any = {}

    const user = await userModel.findOne({_id:req.params.userId})
    profile['user'] = user

    const experience = await experienceModel.find({userId:req.params.userId})
    profile['experience'] = experience

    const skill = await skillModel.find({userId:req.params.userId})
    profile['skill'] = skill

    const certification = await certificationModel.find({userId:req.params.userId})
    profile['certification'] = certification

    res.status(200).json({ status: 200, data: profile });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};