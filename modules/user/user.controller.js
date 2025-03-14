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
exports.deleteUser = exports.updateUser = exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const user_service_1 = require("./user.service");
const jwt_1 = require("../../utils/jwt");
const user_model_1 = __importDefault(require("./user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Register a new user
 */
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, phone, password, businessName, businessDescription, isARetailer } = req.body;
        // Check if email already exists
        const existingEmailUser = yield (0, user_service_1.findUserByEmail)(email);
        if (existingEmailUser) {
            res.status(400).json({ message: "Email is already registered" });
            return;
        }
        // Check if phone number already exists
        const existingPhoneUser = yield (0, user_service_1.findUserByPhone)(phone);
        if ((_a = existingPhoneUser[0]) === null || _a === void 0 ? void 0 : _a.userId) {
            res.status(400).json({ message: "Phone number is already registered" });
            return;
        }
        // Ensure all required fields are present
        if (!name || !email || !phone || !password) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Create user
        const user = yield (0, user_service_1.createUser)(Object.assign(Object.assign({}, req.body), { userId: `EX${phone}`, password: hashedPassword }));
        // Generate JWT token
        const token = (0, jwt_1.generateToken)(user.userId, user === null || user === void 0 ? void 0 : user.email);
        res.status(201).json({
            success: true,
            data: user,
            token
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { identifier, password } = req.body; // identifier can be email or phone
        console.log(identifier, password, "{{{{{{{{{{{{{{{{{{{{{{{{{{");
        // Check if the user exists (by email or phone)
        const user = identifier.includes("@")
            ? yield (0, user_service_1.findUserByEmail)(identifier)
            : yield (0, user_service_1.findUserByPhone)(identifier);
        console.log(user, '{{{{{{{{{{{{{{{{{{{');
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        // Verify password
        const isMatch = yield bcryptjs_1.default.compare(password, user[0].password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        // Generate JWT token
        const token = (0, jwt_1.generateToken)(user[0].userId, (_a = user[0]) === null || _a === void 0 ? void 0 : _a.email);
        res.status(200).json({
            success: true,
            data: user,
            token
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract query parameters
        const { name, email, phone, businessName, isARetailer, sortBy = "createdAt", sortOrder = "desc", page = "1", limit = "10", search, hidePassword = "false" // Default: false (password is included)
         } = req.query;
        // Build filter object
        const filter = {};
        if (name)
            filter.name = new RegExp(name, "i"); // Case-insensitive search
        if (email)
            filter.email = new RegExp(email, "i");
        if (phone)
            filter.phone = phone;
        if (businessName)
            filter.businessName = new RegExp(businessName, "i");
        if (isARetailer !== undefined)
            filter.isARetailer = isARetailer === "true"; // Convert to boolean
        // Search across multiple fields
        if (search) {
            const searchRegex = new RegExp(search, "i");
            filter.$or = [
                { name: searchRegex },
                { email: searchRegex },
                { phone: searchRegex },
                { businessName: searchRegex }
            ];
        }
        // Pagination setup
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;
        const skip = (pageNumber - 1) * pageSize;
        // Define the fields to be selected
        const fieldsToSelect = hidePassword === "true" ? "-password" : ""; // Exclude password if true
        // Fetch users with filtering, sorting, and pagination
        const users = yield user_model_1.default.find(filter)
            .select(fieldsToSelect) // Exclude password if requested
            .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
            .skip(skip)
            .limit(pageSize);
        // Get total count for pagination
        const totalUsers = yield user_model_1.default.countDocuments(filter);
        res.status(200).json({
            success: true,
            data: users,
            meta: {
                totalData: totalUsers,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalUsers / pageSize),
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUsers = getUsers;
// Update a Product by ID
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Product = yield (0, user_service_1.updateUserInDb)(req.params.id, req.body);
        if (!Product) {
            res.status(404).json({ message: "User  not found" });
            return;
        }
        res.status(201).json({
            success: true,
            data: Product
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
});
exports.updateUser = updateUser;
// Delete a Product by ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Product = yield (0, user_service_1.deleteUserFromDb)(req.params.id);
        if (!Product) {
            res.status(404).json({ message: "User  not found" });
            return;
        }
        res.json({ message: " deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
});
exports.deleteUser = deleteUser;
