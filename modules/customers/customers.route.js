"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customers_controller_1 = require("./customers.controller");
const router = express_1.default.Router();
router.post("/create", customers_controller_1.createCustomers);
router.get("/", customers_controller_1.getCustomers);
router.get("/:id", customers_controller_1.getCustomersById);
router.post("/:id", customers_controller_1.updateCustomers);
router.delete("/:id", customers_controller_1.deleteCustomers);
exports.default = router;
