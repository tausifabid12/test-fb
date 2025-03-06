"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SubscriptionSchema = new mongoose_1.default.Schema({
    plan: {
        type: String,
        enum: ['monthly', 'six-monthly', 'yearly'],
        required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    active: { type: Boolean, required: true, default: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userPhoneNumber: { type: String, required: true },
}, { timestamps: true });
const Subscription = mongoose_1.default.model("Subscription", SubscriptionSchema);
exports.default = Subscription;
