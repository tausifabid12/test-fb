"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminLeads_controller_1 = require("./adminLeads.controller");
const router = express_1.default.Router();
router.post("/create", adminLeads_controller_1.createAdminLead);
router.get("/", adminLeads_controller_1.getAdminLeads);
router.get("/:id", adminLeads_controller_1.getAdminLeadById);
router.post("/:id", adminLeads_controller_1.updateAdminLead);
router.delete("/:id", adminLeads_controller_1.deleteAdminLead);
exports.default = router;
