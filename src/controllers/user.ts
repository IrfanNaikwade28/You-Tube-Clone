import User from "../models/User"
import Video from "../models/Video"
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../verifyToken";

export const update = async(req: CustomRequest, res: Response, next: NextFunction)=>{
    if(req.params.id === req.user.id){
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },
        {new : true})
            res.status(200).json(updatedUser)
        }catch(err){
            next(err)
            console.log(err)
        }
    }else{
        const error = new Error("You can update only your account");
        next(error);
    }
}
export const deleteUser = async(req: CustomRequest, res: Response, next: NextFunction)=>{
    if(req.params.id === req.user.id){
        try{
            const deleteUser = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted.")
        }catch(err){
            next(err)
            console.log(err)
        }
    }else{
        const error = new Error("You can delete only your account");
        next(error);
    }
}
export const getUser = async(req: CustomRequest, res: Response, next: NextFunction)=>{
    try{
        const user = await User.findById(req.params.id)
    }catch(err){
        next(err);;
    }
}
export const subscribe = async(req: CustomRequest, res: Response, next: NextFunction)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers: 1}
        });
        res.status(200).json("Subscribed this channel successfully");
    }catch(err){
        next(err)
        console.log(err)
    }
}
export const unsubscribe = async(req: CustomRequest, res: Response, next: NextFunction)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers:req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id,{
            $dec:{subscribers: 1}
        });
        res.status(200).json("Unsubscribed this channel successfully");
    }catch(err){
        next(err)
        console.log(err)
    }
}
export const like = async(req: CustomRequest, res: Response, next: NextFunction)=>{
    const id = req.user.id;
    const videoId = req.params.videoId;
    try{
        await Video.findByIdAndUpdate(videoId,{
            $addToSet: {likes:id},
            $pull: {dislikes:id},
        })
        res.status(200).json("You Liked this video");
    }catch(err){
        console.log(err)
        next(err)
    }
}
export const dislike = async(req: CustomRequest, res: Response, next: NextFunction)=>{
    const id = req.user.id;
    const videoId = req.params.videoId;
    try{
        await Video.findByIdAndUpdate(videoId,{
            $addToSet: {dislikes:id},
            $pull: {likes:id},
        })
        res.status(200).json("You Disliked this video");
    }catch(err){
        console.log(err)
        next(err)
    }
}

