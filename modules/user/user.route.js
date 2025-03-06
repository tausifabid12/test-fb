"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const checkSubscription_middlewate_1 = require("../../middlewares/checkSubscription.middlewate");
const router = express_1.default.Router();
router.post("/register", user_controller_1.registerUser);
router.post("/login", user_controller_1.loginUser);
// router.get("/", authenticateUser, getAllUsers);
router.get("/list", auth_middleware_1.authenticateUser, checkSubscription_middlewate_1.checkSubscription, user_controller_1.getUsers);
exports.default = router;
