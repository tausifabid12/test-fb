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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategorys = exports.createCategory = void 0;
const category_service_1 = require("./category.service");
// Create a new Category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Category = yield (0, category_service_1.createCategoryInDb)(req.body);
        res.status(201).json({
            success: true,
            data: Category
        });
    }
    catch (error) {
        res.status(400).json({ message: "Error creating ", error });
    }
});
exports.createCategory = createCategory;
// Get all Categorys
const getCategorys = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Categorys = yield (0, category_service_1.getCategorysFromDb)();
        res.status(201).json({
            success: true,
            data: Categorys
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
    }
});
exports.getCategorys = getCategorys;
// Get a single Category by ID
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Category = yield (0, category_service_1.getCategoryByIdFromDb)(req.params.id);
        if (!Category) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Category
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
});
exports.getCategoryById = getCategoryById;
// Update a Category by ID
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Category = yield (0, category_service_1.updateCategoryInDb)(req.params.id, req.body);
        if (!Category) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Category
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
});
exports.updateCategory = updateCategory;
// Delete a Category by ID
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Category = yield (0, category_service_1.deleteCategoryFromDb)(req.params.id);
        if (!Category) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
});
exports.deleteCategory = deleteCategory;
