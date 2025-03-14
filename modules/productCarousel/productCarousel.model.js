"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductCarouselSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    carouselItems: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
            link: { type: String, required: true },
            imageUrl: { type: String, required: true }
        }
    ]
}, { timestamps: true });
const ProductCarousel = mongoose_1.default.model("ProductCarousel", ProductCarouselSchema);
exports.default = ProductCarousel;
