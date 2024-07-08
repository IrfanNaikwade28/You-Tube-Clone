import mongoose from "mongoose";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
    const newUser = new User({...req.body, password:hash});
    await newUser.save();
    res.status(200).send("User Has been Created");
  } catch (err) {
    next(err);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findOne({ name: req.body.name });
    console.log(user)
    if (!user) {
      res.send("404 User Not found");
      console.log("404 User Not found");
      return;
    }
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    console.log(user.password)
    if (!isCorrect) {
      res.send("400 Wrong Password");
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT || "");
    const { password, ...others } = user?.toObject();
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};
