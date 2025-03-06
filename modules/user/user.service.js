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
exports.createUser = exports.findUserByPhone = exports.findUserByEmail = void 0;
const user_model_1 = __importDefault(require("./user.model"));
/**
 * Find a user by email
 * @param email - User's email
 * @returns User object or null
 */
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({ email });
});
exports.findUserByEmail = findUserByEmail;
const findUserByPhone = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({ phone });
});
exports.findUserByPhone = findUserByPhone;
/**
 * Create a new user
 * @param name - User's name
 * @param email - User's email
 * @param password - Plain text password
 * @returns Created user object
 */
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, name, email, phone, password, businessName, businessDescription, isARetailer }) {
    return yield user_model_1.default.create({
        userId,
        name,
        email,
        phone,
        password,
        businessName,
        businessDescription,
        isARetailer
    });
});
exports.createUser = createUser;
