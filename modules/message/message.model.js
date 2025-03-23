"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    userId: { type: String, },
    userName: { type: String, },
    receiverProfileId: { type: String, },
    senderProfileId: { type: String, },
    senderName: { type: String, },
    messages: [
        {
            messageText: { type: String, required: false },
            imageUrl: { type: String, required: false },
            videoUrl: { type: String, required: false },
            type: { type: String, enum: ['text', 'image', 'template'], },
            messageId: { type: String, },
            isSeen: { type: Boolean, default: false },
            time: { type: String, },
            echo: { type: Boolean, }
        }
    ]
}, { timestamps: true });
const Message = mongoose_1.default.model("Message", MessageSchema);
exports.default = Message;
