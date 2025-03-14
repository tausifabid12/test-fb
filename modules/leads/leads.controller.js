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
exports.deleteLead = exports.updateLead = exports.getLeadById = exports.getLeads = exports.createLead = void 0;
const leads_service_1 = require("./leads.service");
// Create a new Lead
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Lead = yield (0, leads_service_1.createLeadInDb)(req.body);
        res.status(201).json({
            success: true,
            data: Lead
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating ", error });
    }
});
exports.createLead = createLead;
// Get all Leads
const getLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, categoryName, name } = req.query;
        const Leads = yield (0, leads_service_1.getLeadsFromDb)(name, categoryName, categoryId);
        res.status(201).json({
            success: true,
            data: Leads
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
    }
});
exports.getLeads = getLeads;
// Get a single Lead by ID
const getLeadById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Lead = yield (0, leads_service_1.getLeadByIdFromDb)(req.params.id);
        if (!Lead) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Lead
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
});
exports.getLeadById = getLeadById;
// Update a Lead by ID
const updateLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Lead = yield (0, leads_service_1.updateLeadInDb)(req.params.id, req.body);
        if (!Lead) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Lead
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
});
exports.updateLead = updateLead;
// Delete a Lead by ID
const deleteLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Lead = yield (0, leads_service_1.deleteLeadFromDb)(req.params.id);
        if (!Lead) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
});
exports.deleteLead = deleteLead;
