// import express, {Request,Response,NextFunction} from 'express';
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/" + file.fieldname);
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.originalname.match(" ")) {
    cb(new Error("No space allowed in file name"), false);
  } else {
    // console.log(">>>>>>>", file.fieldname == "certificate", file);
    if (file.fieldname == "certificate") {
      if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "application/pdf"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg, png or pdf"), false);
      }
    } else {
      if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
      }
    }
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
export = upload;
