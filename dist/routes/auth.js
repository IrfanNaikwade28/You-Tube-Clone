"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../controllers/auth.js");
const auth_js_2 = require("../controllers/auth.js");
const router = express_1.default.Router();
router.post('/signup', auth_js_1.signup);
router.post('/signin', auth_js_2.signin);
router.post('/google');
exports.default = router;
