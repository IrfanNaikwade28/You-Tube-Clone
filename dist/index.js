"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const comments_1 = __importDefault(require("./routes/comments"));
const videos_1 = __importDefault(require("./routes/videos"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const connect = () => {
    mongoose_1.default.connect(process.env.MONGO || '').then(() => {
        console.log("Connected to DB");
    }).catch((err) => { throw err; });
};
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
app.use("/api/videos", videos_1.default);
app.use("/api/comment", comments_1.default);
app.listen(3000, () => {
    connect();
    console.log("Server Started...");
});
