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
exports.deleteProductFromDb = exports.updateProductInDb = exports.getProductByIdFromDb = exports.getProductsFromDb = exports.createProductInDb = void 0;
const product_model_1 = __importDefault(require("./product.model"));
// Create a new Product
const createProductInDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.create(data);
});
exports.createProductInDb = createProductInDb;
// Get all Products
const getProductsFromDb = (name, categoryName, categoryId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (name) {
        filter.name = { $regex: name, $options: "i" };
    }
    if (userId) {
        filter.userId = userId;
    }
    if (categoryName) {
        filter.categoryName = { $regex: categoryName, $options: "i" };
    }
    if ((categoryId === null || categoryId === void 0 ? void 0 : categoryId.length) && (categoryId === null || categoryId === void 0 ? void 0 : categoryId.length) > 2) {
        filter.categoryId = categoryId;
    }
    return yield product_model_1.default.find(filter);
});
exports.getProductsFromDb = getProductsFromDb;
// Get a single Product by ID
const getProductByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findById(id);
});
exports.getProductByIdFromDb = getProductByIdFromDb;
// Update a Product by ID
const updateProductInDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updateProductInDb = updateProductInDb;
// Delete a Product by ID
const deleteProductFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findByIdAndDelete(id);
});
exports.deleteProductFromDb = deleteProductFromDb;
