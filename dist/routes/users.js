"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../verifyToken");
const user_js_1 = require("../controllers/user.js");
const router = express_1.default.Router();
router.put('/:id', verifyToken_1.verifyToken, user_js_1.update);
router.delete('/:id', verifyToken_1.verifyToken, user_js_1.deleteUser);
router.get('/find/:id', user_js_1.getUser);
router.put('/sub/:id', verifyToken_1.verifyToken, user_js_1.subscribe);
router.put('/unsub/:id', verifyToken_1.verifyToken, user_js_1.unsubscribe);
router.put('/like/:videoId', verifyToken_1.verifyToken, user_js_1.like);
router.put('/dislike/:videoId', verifyToken_1.verifyToken, user_js_1.dislike);
exports.default = router;
