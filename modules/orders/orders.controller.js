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
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const orders_service_1 = require("./orders.service");
// Create a new Order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Order = yield (0, orders_service_1.createOrderInDb)(req.body);
        res.status(201).json({
            success: true,
            data: Order
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating ", error });
    }
});
exports.createOrder = createOrder;
// Get all Orders
const getOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Orders = yield (0, orders_service_1.getOrdersFromDb)();
        res.status(201).json({
            success: true,
            data: Orders
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
    }
});
exports.getOrders = getOrders;
// Get a single Order by ID
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Order = yield (0, orders_service_1.getOrderByIdFromDb)(req.params.id);
        if (!Order) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Order
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
});
exports.getOrderById = getOrderById;
// Update a Order by ID
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Order = yield (0, orders_service_1.updateOrderInDb)(req.params.id, req.body);
        if (!Order) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Order
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
});
exports.updateOrder = updateOrder;
// Delete a Order by ID
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Order = yield (0, orders_service_1.deleteOrderFromDb)(req.params.id);
        if (!Order) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
});
exports.deleteOrder = deleteOrder;
