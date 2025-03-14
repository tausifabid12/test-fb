"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const automation_controller_1 = require("./automation.controller");
const router = express_1.default.Router();
router.post("/create", automation_controller_1.createAutomation);
router.get("/", automation_controller_1.getAutomations);
router.get("/:id", automation_controller_1.getAutomationById);
router.post("/:id", automation_controller_1.updateAutomation);
router.delete("/:id", automation_controller_1.deleteAutomation);
exports.default = router;
