import { Request, Response, Express } from "express";
const { certificationModel } = require("../model");

interface IUser extends Express.User {
  _id?: string;
}

export const addCertification = async (req: Request, res: Response) => {
  try {
    const user: IUser | undefined = req.user;
    const body = req.body;

    if (req.file) {
      body.certificate =
        process.env.DOCS_URL + req.file.fieldname + "/" + req.file.filename;
    }

    let certification = new certificationModel(body);
    certification.userId = user?._id;
    const savedCertification = await certification.save();

    res.status(200).json({ status: 200, data: savedCertification });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};

export const getCertificationByUserId = async (req: Request, res: Response) => {
  try {
    const user: IUser | undefined = req.user;
    const certification = await certificationModel.find({ userId: user?._id });
    res.status(200).json({ status: 200, data: certification });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};

export const updateCertification = async (req: Request, res: Response) => {
  try {
    const certification = await certificationModel.find({
      _id: req.params.certificationId,
    });
    if (certification) {
      const body = req.body;

      if (req.file) {
        body.certificate =
          process.env.DOCS_URL + req.file.fieldname + "/" + req.file.filename;
      }

      const savedCertification = await certificationModel.findOneAndUpdate(
        { _id: req.params.certificationId },
        body,
        { new: true }
      );
      res.status(200).json({ status: 200, data: savedCertification });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Certification Not Found!!" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};

export const deleteCertification = async (req: Request, res: Response) => {
  try {
    const certification = await certificationModel.find({
      _id: req.params.certificationId,
    });
    if (certification) {
      const deletedCertification = await certificationModel.findOneAndDelete({
        _id: req.params.certificationId,
      });
      res
        .status(200)
        .json({ status: 200, message: "Certification Deleted Successfully!!" });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Certification Not Found!!" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, message: "Something want worng!!" + e });
  }
};
