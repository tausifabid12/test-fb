"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscription_controller_1 = require("./subscription.controller");
const router = express_1.default.Router();
router.post("/create", subscription_controller_1.createSubscription);
router.get("/", subscription_controller_1.getSubscriptions);
router.get("/:id", subscription_controller_1.getSubscriptionById);
router.post("/:id", subscription_controller_1.updateSubscription);
router.delete("/:id", subscription_controller_1.deleteSubscription);
exports.default = router;
