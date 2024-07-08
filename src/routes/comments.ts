import express from "express"
import { addComment, deleteComment, getComment } from  "../controllers/comment.js"
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", addComment);
router.post("/:id", deleteComment);
router.post("/:videoId",verifyToken, getComment);

export default router;