"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LeadILeadSchema = new mongoose_1.default.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    profileUrl: { type: String },
    interestedPostIds: { type: [String], default: [] },
    interestedProductId: { type: [String], default: [] },
    isCustomer: { type: Boolean, default: false },
    orderCount: { type: Number, default: 0 },
    orderIds: { type: [String], default: [] },
    address: { type: String },
    state: { type: String },
    city: { type: String },
    profileId: { type: String, unique: true },
    source: { type: String, enum: ['facebook', 'instagram'], default: 'facebook' }
}, { timestamps: true });
const Lead = mongoose_1.default.model("LeadILead", LeadILeadSchema);
exports.default = Lead;
