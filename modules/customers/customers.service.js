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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomersFromDb = exports.updateCustomersInDb = exports.getCustomersByIdFromDb = exports.getCustomersFromDb = exports.createCustomersInDb = void 0;
const customers_model_1 = __importDefault(require("./customers.model"));
// Create a new Customers
const createCustomersInDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield customers_model_1.default.create(data);
});
exports.createCustomersInDb = createCustomersInDb;
// Get all Customers
const getCustomersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield customers_model_1.default.find();
});
exports.getCustomersFromDb = getCustomersFromDb;
// Get a single Customers by ID
const getCustomersByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield customers_model_1.default.findById(id);
});
exports.getCustomersByIdFromDb = getCustomersByIdFromDb;
// Update a Customers by ID
const updateCustomersInDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield customers_model_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updateCustomersInDb = updateCustomersInDb;
// Delete a Customers by ID
const deleteCustomersFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield customers_model_1.default.findByIdAndDelete(id);
});
exports.deleteCustomersFromDb = deleteCustomersFromDb;
