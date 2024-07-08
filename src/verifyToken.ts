import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
    user?: any;
}
export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token: string | undefined = req.cookies.access_token;
    if (!token) {
        return next(new Error("Not Authenticated"));
    }
    jwt.verify(token, process.env.JWT as string, (err: any, user: any) => {
        if (err) {
            return next(err);
        }
        req.user = user;
        next();
    });
}