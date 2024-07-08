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
exports.deleteCertification = exports.updateCertification = exports.getCertificationByUserId = exports.addCertification = void 0;
const { certificationModel } = require("../model");
const addCertification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const body = req.body;
        if (req.file) {
            body.certificate =
                process.env.DOCS_URL + req.file.fieldname + "/" + req.file.filename;
        }
        let certification = new certificationModel(body);
        certification.userId = user === null || user === void 0 ? void 0 : user._id;
        const savedCertification = yield certification.save();
        res.status(200).json({ status: 200, data: savedCertification });
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.addCertification = addCertification;
const getCertificationByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const certification = yield certificationModel.find({ userId: user === null || user === void 0 ? void 0 : user._id });
        res.status(200).json({ status: 200, data: certification });
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.getCertificationByUserId = getCertificationByUserId;
const updateCertification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const certification = yield certificationModel.find({
            _id: req.params.certificationId,
        });
        if (certification) {
            const body = req.body;
            if (req.file) {
                body.certificate =
                    process.env.DOCS_URL + req.file.fieldname + "/" + req.file.filename;
            }
            const savedCertification = yield certificationModel.findOneAndUpdate({ _id: req.params.certificationId }, body, { new: true });
            res.status(200).json({ status: 200, data: savedCertification });
        }
        else {
            res
                .status(404)
                .json({ status: 404, message: "Certification Not Found!!" });
        }
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.updateCertification = updateCertification;
const deleteCertification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const certification = yield certificationModel.find({
            _id: req.params.certificationId,
        });
        if (certification) {
            const deletedCertification = yield certificationModel.findOneAndDelete({
                _id: req.params.certificationId,
            });
            res
                .status(200)
                .json({ status: 200, message: "Certification Deleted Successfully!!" });
        }
        else {
            res
                .status(404)
                .json({ status: 404, message: "Certification Not Found!!" });
        }
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.deleteCertification = deleteCertification;
