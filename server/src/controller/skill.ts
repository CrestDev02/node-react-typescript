import { Request, Response, Express} from "express";
const { skillModel } = require("../model");

interface IUser extends Express.User {
    _id?:string
}

export const addSkill = async (req: Request, res: Response) => {
  try {
    const user: IUser | undefined = req.user
    let skill = new skillModel(req.body);
    skill.userId = user?._id
    const savedSkill = await skill.save();
    res.status(200).json({ status: 200, data: savedSkill });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};

export const getSkillByUserId = async (req: Request, res: Response) => {
  try {
    const user: IUser | undefined = req.user
    const skill = await skillModel.find({ userId: user?._id});
    res.status(200).json({ status: 200, data: skill });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const skill = await skillModel.find({ _id: req.params.skillId });
    if (skill) {
      const savedSkill = await skillModel.findOneAndUpdate(
        { _id: req.params.skillId },
        req.body,
        { new: true }
      );
      res.status(200).json({ status: 200, data: savedSkill });
    } else {
      res.status(404).json({ status: 404, message: "Skill Not Found!!" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const skill = await skillModel.find({ _id: req.params.skillId });
    if (skill) {
      const deletedSkill = await skillModel.findOneAndDelete({
        _id: req.params.skillId,
      });
      res
        .status(200)
        .json({ status: 200, message: "Skill Deleted Successfully!!" });
    } else {
      res.status(404).json({ status: 404, message: "Skill Not Found!!" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};
