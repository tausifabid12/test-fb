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
exports.deleteCategoryFromDb = exports.updateCategoryInDb = exports.getCategoryByIdFromDb = exports.getCategorysFromDb = exports.createCategoryInDb = void 0;
const category_model_1 = __importDefault(require("./category.model"));
// Create a new Category
const createCategoryInDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.default.create(data);
});
exports.createCategoryInDb = createCategoryInDb;
// Get all Categorys
const getCategorysFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.default.find();
});
exports.getCategorysFromDb = getCategorysFromDb;
// Get a single Category by ID
const getCategoryByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.default.findById(id);
});
exports.getCategoryByIdFromDb = getCategoryByIdFromDb;
// Update a Category by ID
const updateCategoryInDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updateCategoryInDb = updateCategoryInDb;
// Delete a Category by ID
const deleteCategoryFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.default.findByIdAndDelete(id);
});
exports.deleteCategoryFromDb = deleteCategoryFromDb;
