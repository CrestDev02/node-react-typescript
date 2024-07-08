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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const { userModel } = require("../model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = new userModel(req.body);
        const savedUser = yield user.save();
        res.status(200).json({ status: 200, data: savedUser });
    }
    catch (e) {
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user: any = req.user;
        // if (user.error) {
        //   res.status(400).json({ status: 400, message: user.message });
        // }
        // res.status(200).json(req.user);
        const { email, password } = req.body;
        if (!email || !password) {
            res
                .status(400)
                .json({
                status: 400,
                message: "Something is missing from email or password!!",
            });
        }
        else {
            const user = yield userModel.findOne({ email });
            if (!user) {
                res
                    .status(400)
                    .json({
                    status: 400,
                    message: "User is not Registered for given email!!",
                });
            }
            else {
                user.comparePassword(password, (err, isEqual) => {
                    if (err || !isEqual) {
                        res
                            .status(400)
                            .json({ status: 400, message: "Please Enter Valid Password!!" });
                    }
                    else {
                        const token = jsonwebtoken_1.default.sign({ email }, 'thisisecret');
                        res.status(200).json({ status: 200, token: token });
                    }
                });
            }
        }
    }
    catch (e) {
        // console.log("+++++++", e);
        res
            .status(500)
            .json({ status: 500, message: "Something want worng!!" + e });
    }
});
exports.login = login;
