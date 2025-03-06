"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AccountSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    website: { type: String, enum: ['facebook', 'instagram', 'whatsapp'], required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    accessToken: { type: String, required: true }
}, { timestamps: true });
const Account = mongoose_1.default.model("Account", AccountSchema);
exports.default = Account;
