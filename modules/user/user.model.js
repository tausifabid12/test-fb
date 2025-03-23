"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String },
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
    businessType: { type: String },
    openingTime: { type: String },
    closingTime: { type: String },
    userType: { type: String, enum: ['admin', 'superAdmin', 'agent', 'support', 'consumer'], default: "consumer" },
    isARetailer: { type: Boolean, default: false },
    isFacebookConnected: { type: Boolean, default: false },
}, { timestamps: true });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
