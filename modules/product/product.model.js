"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    categoryName: { type: String, required: true },
    categoryId: { type: String, required: true },
    imageUrl: { type: [String], required: true },
    stock: { type: Number, required: true },
    originalPrice: { type: String, required: true },
    offerPrice: { type: String, required: true },
    videoUrl: { type: String },
    variantNames: [{
            name: { type: String },
            imageUrl: { type: String },
        }]
}, { timestamps: true });
const Product = mongoose_1.default.model("Product", ProductSchema);
exports.default = Product;
