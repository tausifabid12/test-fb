"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    customerDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        address: { type: String, required: true },
        profileId: { type: String, required: true, unique: true },
    },
    products: [
        {
            name: { type: String, required: true },
            description: { type: String, required: true },
            categoryName: { type: String, required: true },
            imageUrl: { type: [String], required: true },
            price: { type: Number, required: true },
            tax: { type: Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
}, { timestamps: true });
const Order = mongoose_1.default.model("Order", OrderSchema);
exports.default = Order;
