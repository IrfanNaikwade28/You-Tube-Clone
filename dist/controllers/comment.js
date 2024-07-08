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
exports.deleteComment = exports.getComment = exports.addComment = void 0;
const Video_1 = __importDefault(require("../models/Video"));
const Comment_1 = __importDefault(require("../models/Comment"));
const addComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newComment = new Comment_1.default(Object.assign(Object.assign({}, req.body), { userId: req.user.id }));
    try {
        const savedComment = yield newComment.save();
        res.status(200).send(savedComment);
    }
    catch (err) {
        console.log(err);
    }
});
exports.addComment = addComment;
const getComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comment_1.default.find({ videoId: req.params.videoId });
        res.status(200).json(comments);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getComment = getComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield Comment_1.default.findById(req.params.id);
        const video = yield Video_1.default.findById(req.params.id);
        if (req.user.id === (comment === null || comment === void 0 ? void 0 : comment.userId) || req.user.id === (video === null || video === void 0 ? void 0 : video.userId)) {
            yield Comment_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json("Comment has been deleted");
        }
        else {
            console.log("You can't delete this comment");
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteComment = deleteComment;
