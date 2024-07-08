"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const certificationRouter = (0, express_1.Router)();
const certificationController = __importStar(require("../controller/certification"));
const passport_1 = __importDefault(require("passport"));
const upload_1 = __importDefault(require("../service/upload"));
const authCheck = passport_1.default.authenticate('jwt', { session: false });
certificationRouter.post('/', authCheck, upload_1.default.single('certificate'), certificationController.addCertification);
certificationRouter.get('/getByUser', authCheck, certificationController.getCertificationByUserId);
certificationRouter.put('/:certificationId', upload_1.default.single('certificate'), authCheck, certificationController.updateCertification);
certificationRouter.delete('/:certificationId', authCheck, certificationController.deleteCertification);
module.exports = certificationRouter;
