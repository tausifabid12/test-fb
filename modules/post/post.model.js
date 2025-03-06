"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    postTime: { type: Date, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, { timestamps: true });
const Post = mongoose_1.default.model("Post", PostSchema);
exports.default = Post;
