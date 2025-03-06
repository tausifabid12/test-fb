"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    receiverAccountId: { type: String, required: true },
    senderAccountId: { type: String, required: true },
    senderName: { type: String, required: true },
    messageText: { type: String, required: true },
    imageUrl: { type: String, required: false },
    videoUrl: { type: String, required: false },
    type: { type: String, enum: ['text', 'image', 'template'], required: true }
}, { timestamps: true });
const Message = mongoose_1.default.model("Message", MessageSchema);
exports.default = Message;
