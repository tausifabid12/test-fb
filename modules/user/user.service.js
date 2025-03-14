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
exports.deleteUserFromDb = exports.updateUserInDb = exports.createUser = exports.findUserByPhone = exports.findUserByEmail = void 0;
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
    console.log(phone, 'IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
    return yield user_model_1.default.find({ phone });
});
exports.findUserByPhone = findUserByPhone;
/**
 * Create a new user
 * @param name - User's name
 * @param email - User's email
 * @param password - Plain text password
 * @returns Created user object
 */
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.create(payload);
});
exports.createUser = createUser;
// Update a Product by ID
const updateUserInDb = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOneAndUpdate({ userId }, data, { new: true });
});
exports.updateUserInDb = updateUserInDb;
// Delete a Product by ID
const deleteUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findByIdAndDelete(id);
});
exports.deleteUserFromDb = deleteUserFromDb;
