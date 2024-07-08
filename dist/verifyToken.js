"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(new Error("Not Authenticated"));
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(err);
        }
        req.user = user;
        next();
    });
};
exports.verifyToken = verifyToken;
