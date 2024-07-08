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
exports.deleteSkill = exports.updateSkill = exports.getSkillByUserId = exports.addSkill = void 0;
const { skillModel } = require("../model");
const addSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        let skill = new skillModel(req.body);
        skill.userId = user === null || user === void 0 ? void 0 : user._id;
        const savedSkill = yield skill.save();
        res.status(200).json({ status: 200, data: savedSkill });
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.addSkill = addSkill;
const getSkillByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const skill = yield skillModel.find({ userId: user === null || user === void 0 ? void 0 : user._id });
        res.status(200).json({ status: 200, data: skill });
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.getSkillByUserId = getSkillByUserId;
const updateSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skill = yield skillModel.find({ _id: req.params.skillId });
        if (skill) {
            const savedSkill = yield skillModel.findOneAndUpdate({ _id: req.params.skillId }, req.body, { new: true });
            res.status(200).json({ status: 200, data: savedSkill });
        }
        else {
            res.status(404).json({ status: 404, message: "Skill Not Found!!" });
        }
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.updateSkill = updateSkill;
const deleteSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skill = yield skillModel.find({ _id: req.params.skillId });
        if (skill) {
            const deletedSkill = yield skillModel.findOneAndDelete({
                _id: req.params.skillId,
            });
            res
                .status(200)
                .json({ status: 200, message: "Skill Deleted Successfully!!" });
        }
        else {
            res.status(404).json({ status: 404, message: "Skill Not Found!!" });
        }
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.deleteSkill = deleteSkill;
