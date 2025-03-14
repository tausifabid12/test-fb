"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductCarousel = exports.updateProductCarousel = exports.getProductCarouselById = exports.getProductCarousels = exports.createProductCarousel = void 0;
const productCarousel_service_1 = require("./productCarousel.service");
// Create a new ProductCarousel
const createProductCarousel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ProductCarousel = yield (0, productCarousel_service_1.createProductCarouselInDb)(req.body);
        res.status(201).json({
            success: true,
            data: ProductCarousel
        });
    }
    catch (error) {
        res.status(400).json({ message: "Error creating ", error });
    }
});
exports.createProductCarousel = createProductCarousel;
// Get all ProductCarousels
const getProductCarousels = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ProductCarousels = yield (0, productCarousel_service_1.getProductCarouselsFromDb)();
        res.status(201).json({
            success: true,
            data: ProductCarousels
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
    }
});
exports.getProductCarousels = getProductCarousels;
// Get a single ProductCarousel by ID
const getProductCarouselById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ProductCarousel = yield (0, productCarousel_service_1.getProductCarouselByIdFromDb)(req.params.id);
        if (!ProductCarousel) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: ProductCarousel
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
});
exports.getProductCarouselById = getProductCarouselById;
// Update a ProductCarousel by ID
const updateProductCarousel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ProductCarousel = yield (0, productCarousel_service_1.updateProductCarouselInDb)(req.params.id, req.body);
        if (!ProductCarousel) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: ProductCarousel
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
});
exports.updateProductCarousel = updateProductCarousel;
// Delete a ProductCarousel by ID
const deleteProductCarousel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ProductCarousel = yield (0, productCarousel_service_1.deleteProductCarouselFromDb)(req.params.id);
        if (!ProductCarousel) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
});
exports.deleteProductCarousel = deleteProductCarousel;
