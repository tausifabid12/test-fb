"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
const router = express_1.default.Router();
router.post("/create", orders_controller_1.createOrder);
router.get("/", orders_controller_1.getOrders);
router.get("/:id", orders_controller_1.getOrderById);
router.post("/:id", orders_controller_1.updateOrder);
router.delete("/:id", orders_controller_1.deleteOrder);
exports.default = router;
