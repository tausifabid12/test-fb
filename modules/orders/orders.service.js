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
exports.deleteOrderFromDb = exports.updateOrderInDb = exports.getOrderByIdFromDb = exports.getOrdersFromDb = exports.createOrderInDb = void 0;
const orders_model_1 = __importDefault(require("./orders.model"));
// Create a new Order
const createOrderInDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orders_model_1.default.create(data);
});
exports.createOrderInDb = createOrderInDb;
// Get all Orders
const getOrdersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield orders_model_1.default.find();
});
exports.getOrdersFromDb = getOrdersFromDb;
// Get a single Order by ID
const getOrderByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orders_model_1.default.findById(id);
});
exports.getOrderByIdFromDb = getOrderByIdFromDb;
// Update a Order by ID
const updateOrderInDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orders_model_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updateOrderInDb = updateOrderInDb;
// Delete a Order by ID
const deleteOrderFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orders_model_1.default.findByIdAndDelete(id);
});
exports.deleteOrderFromDb = deleteOrderFromDb;
