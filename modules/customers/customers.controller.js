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
exports.deleteCustomers = exports.updateCustomers = exports.getCustomersById = exports.getCustomers = exports.createCustomers = void 0;
const customers_service_1 = require("./customers.service");
// Create a new Customers
const createCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Customers = yield (0, customers_service_1.createCustomersInDb)(req.body);
        res.status(201).json({
            success: true,
            data: Customers
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating ", error });
    }
});
exports.createCustomers = createCustomers;
// Get all Customers
const getCustomers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Customers = yield (0, customers_service_1.getCustomersFromDb)();
        res.status(201).json({
            success: true,
            data: Customers
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
    }
});
exports.getCustomers = getCustomers;
// Get a single Customers by ID
const getCustomersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Customers = yield (0, customers_service_1.getCustomersByIdFromDb)(req.params.id);
        if (!Customers) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Customers
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
});
exports.getCustomersById = getCustomersById;
// Update a Customers by ID
const updateCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Customers = yield (0, customers_service_1.updateCustomersInDb)(req.params.id, req.body);
        if (!Customers) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Customers
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
});
exports.updateCustomers = updateCustomers;
// Delete a Customers by ID
const deleteCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Customers = yield (0, customers_service_1.deleteCustomersFromDb)(req.params.id);
        if (!Customers) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
});
exports.deleteCustomers = deleteCustomers;
