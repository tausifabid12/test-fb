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
exports.deleteAutomationFromDb = exports.updateAutomationInDb = exports.getAutomationByIdFromDb = exports.getAutomationsFromDb = exports.createAutomationInDb = void 0;
const automation_model_1 = __importDefault(require("./automation.model"));
// Create a new Automation
const createAutomationInDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield automation_model_1.default.create(data);
});
exports.createAutomationInDb = createAutomationInDb;
// Get all Automations
const getAutomationsFromDb = (name, categoryName, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (name) {
        filter.name = { $regex: name, $options: "i" };
    }
    if (categoryName) {
        filter.categoryName = { $regex: categoryName, $options: "i" };
    }
    if ((categoryId === null || categoryId === void 0 ? void 0 : categoryId.length) && (categoryId === null || categoryId === void 0 ? void 0 : categoryId.length) > 2) {
        filter.categoryId = categoryId;
    }
    return yield automation_model_1.default.find(filter);
});
exports.getAutomationsFromDb = getAutomationsFromDb;
// Get a single Automation by ID
const getAutomationByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield automation_model_1.default.findById(id);
});
exports.getAutomationByIdFromDb = getAutomationByIdFromDb;
// Update a Automation by ID
const updateAutomationInDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield automation_model_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updateAutomationInDb = updateAutomationInDb;
// Delete a Automation by ID
const deleteAutomationFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield automation_model_1.default.findByIdAndDelete(id);
});
exports.deleteAutomationFromDb = deleteAutomationFromDb;
