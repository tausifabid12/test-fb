"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminLeads_interface_1 = require("./adminLeads.interface");
const AdminLeadSchema = new mongoose_1.default.Schema({
    businessName: { type: String, required: true, trim: true },
    contactPersonName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, unique: true },
    phone: { type: String, trim: true, unique: true },
    whatsapp: { type: String, trim: true },
    source: { type: String, enum: Object.values(adminLeads_interface_1.LeadSource), required: true },
    sourceUrl: { type: String, required: true, trim: true },
    businessSize: { type: String, enum: Object.values(adminLeads_interface_1.BusinessSize), },
    status: { type: String, enum: Object.values(adminLeads_interface_1.LeadStatus), default: adminLeads_interface_1.LeadStatus.COLLECTED },
}, { timestamps: true });
const AdminLead = mongoose_1.default.model("AdminLead", AdminLeadSchema);
exports.default = AdminLead;
