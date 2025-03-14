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
exports.deleteAccountFromDb = exports.updateAccountInDb = exports.getAccountByIdFromDb = exports.getAccountsFromDb = exports.createAccountInDb = void 0;
const accounts_model_1 = __importDefault(require("./accounts.model"));
// Create a new Account
const createAccountInDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield accounts_model_1.default.create(data);
});
exports.createAccountInDb = createAccountInDb;
// Get all Accounts
const getAccountsFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (userId) {
        query.userId = userId;
    }
    return yield accounts_model_1.default.find(query);
});
exports.getAccountsFromDb = getAccountsFromDb;
// Get a single Account by ID
const getAccountByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield accounts_model_1.default.findById(id);
});
exports.getAccountByIdFromDb = getAccountByIdFromDb;
// Update a Account by ID
const updateAccountInDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield accounts_model_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updateAccountInDb = updateAccountInDb;
// Delete a Account by ID
const deleteAccountFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield accounts_model_1.default.findByIdAndDelete(id);
});
exports.deleteAccountFromDb = deleteAccountFromDb;
