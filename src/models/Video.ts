import mongoose, { Schema, Document } from "mongoose";

interface IVideo extends Document {
    userId: string;
    title: string;
    desc: string;
    imgUrl: string;
    VideoUrl: string;
    views: number;
    tags: string[];
    likes: string[];
    dislikes: string[];
    createdAt: Date;
}

const VideoSchema: Schema<IVideo> = new Schema<IVideo>({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    VideoUrl: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    dislikes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
}, { timestamps: true });


export { IVideo }
export default mongoose.model<IVideo>("Video", VideoSchema);