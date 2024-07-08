import { Request, Response, Express} from "express";
const { experienceModel } = require("../model");

interface IUser extends Express.User {
    _id?:string
}

export const addExperience = async (req: Request, res: Response) => {
  try {
    const user: IUser | undefined = req.user
    let experience = new experienceModel(req.body);
    experience.userId = user?._id
    const savedExperience = await experience.save();
    res.status(200).json({ status: 200, data: savedExperience });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};

export const getExperienceByUserId = async (req: Request, res: Response) => {
  try {
    const user: IUser | undefined = req.user
    const experience = await experienceModel.find({ userId: user?._id});
    res.status(200).json({ status: 200, data: experience });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const experience = await experienceModel.find({ _id: req.params.expId });
    if (experience) {
      const savedExperience = await experienceModel.findOneAndUpdate(
        { _id: req.params.expId },
        req.body,
        { new: true }
      );
      res.status(200).json({ status: 200, data: savedExperience });
    } else {
      res.status(404).json({ status: 404, message: "Experience Not Found!!" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const experience = await experienceModel.find({ _id: req.params.expId });
    if (experience) {
      const deletedExperience = await experienceModel.findOneAndDelete({
        _id: req.params.expId,
      });
      res
        .status(200)
        .json({ status: 200, message: "Experience Deleted Successfully!!" });
    } else {
      res.status(404).json({ status: 404, message: "Experience Not Found!!" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};
