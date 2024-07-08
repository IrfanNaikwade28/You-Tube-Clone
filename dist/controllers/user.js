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
exports.dislike = exports.like = exports.unsubscribe = exports.subscribe = exports.getUser = exports.deleteUser = exports.update = void 0;
const User_1 = __importDefault(require("../models/User"));
const Video_1 = __importDefault(require("../models/Video"));
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedUser);
        }
        catch (err) {
            next(err);
            console.log(err);
        }
    }
    else {
        const error = new Error("You can update only your account");
        next(error);
    }
});
exports.update = update;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id === req.user.id) {
        try {
            const deleteUser = yield User_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted.");
        }
        catch (err) {
            next(err);
            console.log(err);
        }
    }
    else {
        const error = new Error("You can delete only your account");
        next(error);
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
    }
    catch (err) {
        next(err);
        ;
    }
});
exports.getUser = getUser;
const subscribe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        });
        yield User_1.default.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        });
        res.status(200).json("Subscribed this channel successfully");
    }
    catch (err) {
        next(err);
        console.log(err);
    }
});
exports.subscribe = subscribe;
const unsubscribe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        });
        yield User_1.default.findByIdAndUpdate(req.params.id, {
            $dec: { subscribers: 1 }
        });
        res.status(200).json("Unsubscribed this channel successfully");
    }
    catch (err) {
        next(err);
        console.log(err);
    }
});
exports.unsubscribe = unsubscribe;
const like = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        yield Video_1.default.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id },
        });
        res.status(200).json("You Liked this video");
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.like = like;
const dislike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        yield Video_1.default.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id },
        });
        res.status(200).json("You Disliked this video");
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.dislike = dislike;
