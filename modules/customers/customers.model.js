"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CustomersSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    customerProfile: {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        profileId: { type: String, required: true, unique: true },
    },
    customerLocation: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        address: { type: String, required: true },
    },
    orderStats: {
        totalOrders: { type: Number, default: 0 },
        totalSpent: { type: Number, default: 0 },
    },
    productIds: [{ type: String }],
}, { timestamps: true });
const Customers = mongoose_1.default.model("Customers", CustomersSchema);
exports.default = Customers;
