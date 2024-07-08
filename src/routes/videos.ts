import express from "express"
import { verifyToken } from "../verifyToken.js";
import {addVideo, deleteVideo, getVideo, random, sub, updateVideo, addView, trend, getByTag, search} from  "../controllers/video.js"

const router = express.Router();

router.post("/",verifyToken,addVideo)
router.delete("/:id",verifyToken,deleteVideo)
router.put("/:id",verifyToken,updateVideo)
router.get("/find/:id",verifyToken,getVideo)
router.put("/view/:id",addView)
router.put("/view/:id",trend)
router.get("/view/:id",random)
router.get("/sub/:id",verifyToken, sub)
router.get("/tags/:id", getByTag)
router.get("/search/:id", search)

export default router;