import { Request, Response } from "express";
const { userModel } = require("../model");
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    let user = new userModel(req.body);
    const savedUser = await user.save();
    res.status(200).json({ status: 200, data: savedUser });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // const user: any = req.user;
    // if (user.error) {
    //   res.status(400).json({ status: 400, message: user.message });
    // }
    // res.status(200).json(req.user);
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({
          status: 400,
          message: "Something is missing from email or password!!",
        });
    } else {
      const user = await userModel.findOne({ email });
      if (!user) {
        res
          .status(400)
          .json({
            status: 400,
            message: "User is not Registered for given email!!",
          });
      } else {
        user.comparePassword(password, (err: number, isEqual: boolean) => {
          if (err || !isEqual) {
            res
              .status(400)
              .json({ status: 400, message: "Please Enter Valid Password!!" });
          } else {
            const token = jwt.sign({ email }, 'thisisecret');
            res.status(200).json({status:200, token:token})
          }
        });
      }
    }
  } catch (e) {
    // console.log("+++++++", e);
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};