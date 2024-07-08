import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
  userId: string;
  videoId: string;
  desc: string;
}

const CommentSchema: Schema = new Schema({
  userId: {
    type: { type: String, required: true },
  },
  videoId: {
    type: { type: String, required: true },
  },
  desc: {
    type: { type: String, required: true },
  },
});

export { IComment }
export default mongoose.model<IComment>("Comment", CommentSchema);
