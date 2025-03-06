"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accounts_controller_1 = require("./accounts.controller");
const router = express_1.default.Router();
router.post("/create", accounts_controller_1.createAccount);
router.get("/", accounts_controller_1.getAccounts);
router.get("/:id", accounts_controller_1.getAccountById);
router.post("/:id", accounts_controller_1.updateAccount);
router.delete("/:id", accounts_controller_1.deleteAccount);
exports.default = router;
