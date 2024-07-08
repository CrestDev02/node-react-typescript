"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// import express, {Request,Response,NextFunction} from 'express';
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/" + file.fieldname);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.originalname.match(" ")) {
        cb(new Error("No space allowed in file name"), false);
    }
    else {
        // console.log(">>>>>>>", file.fieldname == "certificate", file);
        if (file.fieldname == "certificate") {
            if (file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg" ||
                file.mimetype === "image/png" ||
                file.mimetype === "application/pdf") {
                cb(null, true);
            }
            else {
                cb(new Error("Image uploaded is not of type jpg/jpeg, png or pdf"), false);
            }
        }
        else {
            if (file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg" ||
                file.mimetype === "image/png") {
                cb(null, true);
            }
            else {
                cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
            }
        }
    }
};
const upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
module.exports = upload;
