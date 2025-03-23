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
exports.deleteAccount = exports.updateAccount = exports.getAccountById = exports.getAccounts = exports.createAccount = void 0;
const accounts_service_1 = require("./accounts.service");
const accounts_model_1 = __importDefault(require("./accounts.model"));
// Create a new Account
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileId } = req.body;
        // Check if an account with the same profileId already exists
        const existingAccount = yield accounts_model_1.default.findOne({ profileId });
        if (existingAccount) {
            res.status(400).json({
                success: false,
                message: "This Facebook account is already linked to another account."
            });
            return; // Stop execution
        }
        const result = yield (0, accounts_service_1.createAccountInDb)(req.body);
        res.status(201).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        res.status(400).json({ message: "Error creating ", error });
    }
});
exports.createAccount = createAccount;
// Get all Accounts
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        const Accounts = yield (0, accounts_service_1.getAccountsFromDb)(userId);
        res.status(201).json({
            success: true,
            data: Accounts
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
    }
});
exports.getAccounts = getAccounts;
// Get a single Account by ID
const getAccountById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Account = yield (0, accounts_service_1.getAccountByIdFromDb)(req.params.id);
        if (!Account) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Account);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
});
exports.getAccountById = getAccountById;
// Update a Account by ID
const updateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Account = yield (0, accounts_service_1.updateAccountInDb)(req.params.id, req.body);
        if (!Account) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Account);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
});
exports.updateAccount = updateAccount;
// Delete a Account by ID
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Account = yield (0, accounts_service_1.deleteAccountFromDb)(req.params.id);
        if (!Account) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
});
exports.deleteAccount = deleteAccount;
