"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const experience_1 = __importDefault(require("./experience"));
const skill_1 = __importDefault(require("./skill"));
const user_1 = __importDefault(require("./user"));
const certification_1 = __importDefault(require("./certification"));
const allRouter = (0, express_1.Router)();
allRouter.use('/auth', auth_1.default);
allRouter.use('/experience', experience_1.default);
allRouter.use('/skill', skill_1.default);
allRouter.use('/user', user_1.default);
allRouter.use('/certification', certification_1.default);
module.exports = allRouter;
