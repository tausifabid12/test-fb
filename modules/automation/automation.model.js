"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AutomationSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    pageId: { type: String, required: true },
    postId: { type: String, required: true },
    postImageUrl: { type: String, required: true },
    postContent: { type: String },
    postUrl: { type: String, required: true },
    keywords: { type: [String], default: [] },
    commentReplies: { type: [String], default: [] },
    outOfStockReplies: { type: [String], default: [] },
    automationType: {
        type: String,
        enum: ["Product_automation", "content_automation"],
        required: true
    },
    productsIds: { type: [String], default: [] }
}, { timestamps: true });
const Automation = mongoose_1.default.model("Automation", AutomationSchema);
exports.default = Automation;
