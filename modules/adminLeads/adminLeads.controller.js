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
exports.deleteAdminLead = exports.updateAdminLead = exports.getAdminLeadById = exports.getAdminLeads = exports.createAdminLead = void 0;
const adminLeads_service_1 = require("./adminLeads.service");
// Create a new AdminLead
const createAdminLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AdminLead = yield (0, adminLeads_service_1.createAdminLeadInDb)(req.body);
        res.status(201).json({
            success: true,
            data: AdminLead
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating ", error });
    }
});
exports.createAdminLead = createAdminLead;
// Get all AdminLeads
const getAdminLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, categoryName, name } = req.query;
        const AdminLeads = yield (0, adminLeads_service_1.getAdminLeadsFromDb)(name, categoryName, categoryId);
        res.status(201).json({
            success: true,
            data: AdminLeads
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
    }
});
exports.getAdminLeads = getAdminLeads;
// Get a single AdminLead by ID
const getAdminLeadById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AdminLead = yield (0, adminLeads_service_1.getAdminLeadByIdFromDb)(req.params.id);
        if (!AdminLead) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: AdminLead
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
});
exports.getAdminLeadById = getAdminLeadById;
// Update a AdminLead by ID
const updateAdminLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AdminLead = yield (0, adminLeads_service_1.updateAdminLeadInDb)(req.params.id, req.body);
        if (!AdminLead) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: AdminLead
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
});
exports.updateAdminLead = updateAdminLead;
// Delete a AdminLead by ID
const deleteAdminLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AdminLead = yield (0, adminLeads_service_1.deleteAdminLeadFromDb)(req.params.id);
        if (!AdminLead) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
});
exports.deleteAdminLead = deleteAdminLead;
