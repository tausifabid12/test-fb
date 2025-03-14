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
exports.deleteAutomation = exports.updateAutomation = exports.getAutomationById = exports.getAutomations = exports.createAutomation = void 0;
const automation_service_1 = require("./automation.service");
// Create a new Automation
const createAutomation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Automation = yield (0, automation_service_1.createAutomationInDb)(req.body);
        res.status(201).json({
            success: true,
            data: Automation
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating ", error });
    }
});
exports.createAutomation = createAutomation;
// Get all Automations
const getAutomations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, categoryName, name } = req.query;
        const Automations = yield (0, automation_service_1.getAutomationsFromDb)(name, categoryName, categoryId);
        res.status(201).json({
            success: true,
            data: Automations
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
    }
});
exports.getAutomations = getAutomations;
// Get a single Automation by ID
const getAutomationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Automation = yield (0, automation_service_1.getAutomationByIdFromDb)(req.params.id);
        if (!Automation) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Automation
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
});
exports.getAutomationById = getAutomationById;
// Update a Automation by ID
const updateAutomation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Automation = yield (0, automation_service_1.updateAutomationInDb)(req.params.id, req.body);
        if (!Automation) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Automation
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
});
exports.updateAutomation = updateAutomation;
// Delete a Automation by ID
const deleteAutomation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Automation = yield (0, automation_service_1.deleteAutomationFromDb)(req.params.id);
        if (!Automation) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
});
exports.deleteAutomation = deleteAutomation;
