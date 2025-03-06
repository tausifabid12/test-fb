"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Generate JWT token
 * @param userId - The user's ID
 * @returns JWT token
 */
const generateToken = (userId, email) => {
    return jsonwebtoken_1.default.sign({ id: userId, email }, // Storing both userId and email in the token
    process.env.JWT_SECRET, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
