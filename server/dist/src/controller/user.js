"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileById = exports.getAllUsers = exports.editProfile = exports.getProfile = void 0;
const model_1 = require("../model");
const { userModel } = require("../model");
require('dotenv').config();
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usr = req.user;
        let profile = {};
        const user = yield userModel.findOne({ _id: usr === null || usr === void 0 ? void 0 : usr._id });
        profile['user'] = user;
        const experience = yield model_1.experienceModel.find({ userId: usr === null || usr === void 0 ? void 0 : usr._id });
        profile['experience'] = experience;
        const skill = yield model_1.skillModel.find({ userId: usr === null || usr === void 0 ? void 0 : usr._id });
        profile['skill'] = skill;
        const certification = yield model_1.certificationModel.find({ userId: usr === null || usr === void 0 ? void 0 : usr._id });
        profile['certification'] = certification;
        res.status(200).json({ status: 200, data: profile });
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.getProfile = getProfile;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usr = req.user;
        const body = req.body;
        if (req.file) {
            body.profile_pic = process.env.DOCS_URL + req.file.fieldname + '/' + req.file.filename;
        }
        let user = yield userModel.findOneAndUpdate({ _id: usr === null || usr === void 0 ? void 0 : usr._id }, Object.assign({}, req.body), { new: true });
        res.status(200).json({ status: 200, data: user });
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.editProfile = editProfile;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usr = req.user;
        let users = yield userModel.find({ _id: { $ne: usr === null || usr === void 0 ? void 0 : usr._id } });
        res.status(200).json({ status: 200, data: users });
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.getAllUsers = getAllUsers;
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let profile = {};
        const user = yield userModel.findOne({ _id: req.params.userId });
        profile['user'] = user;
        const experience = yield model_1.experienceModel.find({ userId: req.params.userId });
        profile['experience'] = experience;
        const skill = yield model_1.skillModel.find({ userId: req.params.userId });
        profile['skill'] = skill;
        const certification = yield model_1.certificationModel.find({ userId: req.params.userId });
        profile['certification'] = certification;
        res.status(200).json({ status: 200, data: profile });
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.getProfileById = getProfileById;
