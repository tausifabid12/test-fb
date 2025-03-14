"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leads_controller_1 = require("./leads.controller");
const router = express_1.default.Router();
router.post("/create", leads_controller_1.createLead);
router.get("/", leads_controller_1.getLeads);
router.get("/:id", leads_controller_1.getLeadById);
router.post("/:id", leads_controller_1.updateLead);
router.delete("/:id", leads_controller_1.deleteLead);
exports.default = router;
