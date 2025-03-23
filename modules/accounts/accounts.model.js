"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AccountSchema = new mongoose_1.default.Schema({
    userId: { type: String },
    profileId: { type: String },
    website: { type: String, enum: ['facebook', 'instagram', 'whatsapp'] },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    accessToken: { type: String },
    pages: [{
            id: { type: String },
            name: { type: String },
            access_token: { type: String },
        }]
}, { timestamps: true });
const Account = mongoose_1.default.model("Account", AccountSchema);
exports.default = Account;
