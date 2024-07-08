import { Request, Response, NextFunction } from "express";
import Video,{IVideo} from "../models/Video";
import Comment,{IComment} from "../models/Comment";
import {CustomRequest} from "../verifyToken"

export const addComment = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const newComment: IComment = new Comment({ ...req.body, userId: req.user.id });
    try {
        const savedComment: IComment = await newComment.save();
        res.status(200).send(savedComment);
    } catch (err) {
        console.log(err);
    }
}

export const getComment = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const comments: IComment[] = await Comment.find({ videoId: req.params.videoId });
        res.status(200).json(comments);
    } catch (err) {
        console.log(err);
    }
}

export const deleteComment = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const comment: IComment | null = await Comment.findById(req.params.id);
        const video: IVideo | null = await Video.findById(req.params.id);
        if (req.user.id === comment?.userId || req.user.id === video?.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Comment has been deleted");
        } else {
            console.log("You can't delete this comment");
        }
    } catch (err) {
        console.log(err);
    }
}