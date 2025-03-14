"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    userId: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    businessName: { type: String },
    businessDescription: { type: String },
    logoUrl: { type: String },
    coverImageUrl: { type: String },
    businessContactNumber: { type: String },
    supportNumber: { type: String },
    businessEmail: { type: String },
    facebookUrl: { type: String },
    linkedInUrl: { type: String },
    instagramUrl: { type: String },
    youtubeUrl: { type: String },
    websiteUrl: { type: String },
    businessType: { type: String, default: '' },
    openingTime: { type: String },
    closingTime: { type: String },
    isARetailer: { type: Boolean, default: true }
}, { timestamps: true });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
