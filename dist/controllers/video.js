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
exports.search = exports.getByTag = exports.sub = exports.trend = exports.random = exports.addView = exports.getVideo = exports.deleteVideo = exports.updateVideo = exports.addVideo = void 0;
const Video_1 = __importDefault(require("../models/Video"));
const User_1 = __importDefault(require("../models/User"));
const addVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user.id) {
        return res.status(401).json("Unauthorized");
    }
    const newVideo = new Video_1.default(Object.assign({ userId: req.user.id }, req.body));
    try {
        const savedVideo = yield newVideo.save();
        res.status(200).json(savedVideo);
    }
    catch (err) {
        next(err);
    }
});
exports.addVideo = addVideo;
const updateVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user.id) {
        return res.status(401).json("Unauthorized");
    }
    try {
        const video = yield Video_1.default.findById(req.params.id);
        if (!video) {
            return res.status(400).json("Video not found");
        }
        if (req.user.id === video.userId) {
            const updatedVideo = yield Video_1.default.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(updatedVideo);
        }
        else {
            res.status(403).json("You can't update");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.updateVideo = updateVideo;
const deleteVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user.id) {
        return res.status(401).json("Unauthorized");
    }
    try {
        const video = yield Video_1.default.findById(req.params.id);
        if (!video) {
            return res.status(400).json("Video not found");
        }
        if (req.user.id === video.userId) {
            yield Video_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json("The video has been deleted");
        }
        else {
            res.status(403).json("You can't delete");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.deleteVideo = deleteVideo;
const getVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield Video_1.default.findById(req.params.id);
        if (!video) {
            return res.status(400).json("Video not found");
        }
        res.status(200).json(video);
    }
    catch (err) {
        next(err);
    }
});
exports.getVideo = getVideo;
const addView = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Video_1.default.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        });
        res.status(200).json("View count is increased");
    }
    catch (err) {
        next(err);
    }
});
exports.addView = addView;
const random = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield Video_1.default.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    }
    catch (err) {
        next(err);
    }
});
exports.random = random;
const trend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield Video_1.default.find().sort({ views: -1 });
        res.status(200).json(videos);
    }
    catch (err) {
        next(err);
    }
});
exports.trend = trend;
const sub = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user.id) {
        return res.status(401).json("Unauthorized");
    }
    try {
        const user = yield User_1.default.findById(req.user.id);
        if (!user) {
            return res.status(400).json("User not found");
        }
        const subscribedChannels = user.subscribedUsers;
        const list = yield Promise.all(subscribedChannels.map(channelId => {
            return Video_1.default.find({ userId: channelId });
        }));
        res.status(200).json(list.flat().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    }
    catch (err) {
        next(err);
    }
});
exports.sub = sub;
const getByTag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tags = typeof req.query.tags === "string" ? req.query.tags.split(",") : [];
    try {
        const videos = yield Video_1.default.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    }
    catch (err) {
        next(err);
    }
});
exports.getByTag = getByTag;
const search = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    try {
        const videos = yield Video_1.default.find({ title: { $regex: query, $options: "i" } }).limit(40);
        res.status(200).json(videos);
    }
    catch (err) {
        next(err);
    }
});
exports.search = search;
