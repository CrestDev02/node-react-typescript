"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
const passport_2 = require("./src/service/passport");
const index_1 = __importDefault(require("./src/route/index"));
require("./src/config/db-connection");
var corsOptions = {
    origin: "http://localhost:3000"
};
app.use((0, cors_1.default)(corsOptions));
(0, passport_2.applyPassportStrategy)(passport_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/uploads', express_1.default.static('uploads'));
app.use('/api/V1', index_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port 8080.`);
});
