"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_js_1 = require("../controllers/comment.js");
const verifyToken_js_1 = require("../verifyToken.js");
const router = express_1.default.Router();
router.post("/", comment_js_1.addComment);
router.post("/:id", comment_js_1.deleteComment);
router.post("/:videoId", verifyToken_js_1.verifyToken, comment_js_1.getComment);
exports.default = router;
