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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = bcrypt_1.default.genSaltSync(10);
        const hash = bcrypt_1.default.hashSync(req.body.password, salt);
        const newUser = new User_1.default(Object.assign(Object.assign({}, req.body), { password: hash }));
        yield newUser.save();
        res.status(200).send("User Has been Created");
    }
    catch (err) {
        next(err);
    }
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ name: req.body.name });
        console.log(user);
        if (!user) {
            res.send("404 User Not found");
            console.log("404 User Not found");
            return;
        }
        const isCorrect = yield bcrypt_1.default.compare(req.body.password, user.password);
        console.log(user.password);
        if (!isCorrect) {
            res.send("400 Wrong Password");
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT || "");
        const _a = user === null || user === void 0 ? void 0 : user.toObject(), { password } = _a, others = __rest(_a, ["password"]);
        res
            .cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(others);
    }
    catch (err) {
        next(err);
    }
});
exports.signin = signin;
