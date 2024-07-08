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
exports.deleteExperience = exports.updateExperience = exports.getExperienceByUserId = exports.addExperience = void 0;
const { experienceModel } = require("../model");
const addExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        let experience = new experienceModel(req.body);
        experience.userId = user === null || user === void 0 ? void 0 : user._id;
        const savedExperience = yield experience.save();
        res.status(200).json({ status: 200, data: savedExperience });
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.addExperience = addExperience;
const getExperienceByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const experience = yield experienceModel.find({ userId: user === null || user === void 0 ? void 0 : user._id });
        res.status(200).json({ status: 200, data: experience });
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.getExperienceByUserId = getExperienceByUserId;
const updateExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const experience = yield experienceModel.find({ _id: req.params.expId });
        if (experience) {
            const savedExperience = yield experienceModel.findOneAndUpdate({ _id: req.params.expId }, req.body, { new: true });
            res.status(200).json({ status: 200, data: savedExperience });
        }
        else {
            res.status(404).json({ status: 404, message: "Experience Not Found!!" });
        }
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.updateExperience = updateExperience;
const deleteExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const experience = yield experienceModel.find({ _id: req.params.expId });
        if (experience) {
            const deletedExperience = yield experienceModel.findOneAndDelete({
                _id: req.params.expId,
            });
            res
                .status(200)
                .json({ status: 200, message: "Experience Deleted Successfully!!" });
        }
        else {
            res.status(404).json({ status: 404, message: "Experience Not Found!!" });
        }
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.deleteExperience = deleteExperience;
