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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductCarouselFromDb = exports.updateProductCarouselInDb = exports.getProductCarouselByIdFromDb = exports.getProductCarouselsFromDb = exports.createProductCarouselInDb = void 0;
const productCarousel_model_1 = __importDefault(require("./productCarousel.model"));
// Create a new ProductCarousel
const createProductCarouselInDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productCarousel_model_1.default.create(data);
});
exports.createProductCarouselInDb = createProductCarouselInDb;
// Get all ProductCarousels
const getProductCarouselsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield productCarousel_model_1.default.find();
});
exports.getProductCarouselsFromDb = getProductCarouselsFromDb;
// Get a single ProductCarousel by ID
const getProductCarouselByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productCarousel_model_1.default.findById(id);
});
exports.getProductCarouselByIdFromDb = getProductCarouselByIdFromDb;
// Update a ProductCarousel by ID
const updateProductCarouselInDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productCarousel_model_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updateProductCarouselInDb = updateProductCarouselInDb;
// Delete a ProductCarousel by ID
const deleteProductCarouselFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productCarousel_model_1.default.findByIdAndDelete(id);
});
exports.deleteProductCarouselFromDb = deleteProductCarouselFromDb;
