"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post("/create", category_controller_1.createCategory);
router.get("/", category_controller_1.getCategorys);
router.get("/:id", category_controller_1.getCategoryById);
router.post("/:id", category_controller_1.updateCategory);
router.delete("/:id", category_controller_1.deleteCategory);
exports.default = router;
