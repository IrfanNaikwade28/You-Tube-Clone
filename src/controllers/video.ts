import Video, { IVideo } from "../models/Video";
import User from "../models/User";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../verifyToken";

export const addVideo = async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json("Unauthorized");
    }
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
};

export const updateVideo = async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json("Unauthorized");
    }
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(400).json("Video not found");
        }
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedVideo);
        } else {
            res.status(403).json("You can't update");
        }
    } catch (err) {
        next(err);
    }
};

export const deleteVideo = async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json("Unauthorized");
    }
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(400).json("Video not found");
        }
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("The video has been deleted");
        } else {
            res.status(403).json("You can't delete");
        }
    } catch (err) {
        next(err);
    }
};

export const getVideo = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(400).json("Video not found");
        }
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
};

export const addView = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        });
        res.status(200).json("View count is increased");
    } catch (err) {
        next(err);
    }
};

export const random = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const trend = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const sub = async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json("Unauthorized");
    }
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json("User not found");
        }
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map(channelId => {
                return Video.find({ userId: channelId });
            })
        );
        res.status(200).json(list.flat().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (err) {
        next(err);
    }
};

export const getByTag = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const tags = typeof req.query.tags === "string" ? req.query.tags.split(",") : [];
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const search = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const query = req.query.q as string;
    try {
        const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};
