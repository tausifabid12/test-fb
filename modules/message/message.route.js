"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("./message.controller");
const router = express_1.default.Router();
router.post("/create", message_controller_1.createMessage);
router.get("/", message_controller_1.getMessages);
router.get("/:id", message_controller_1.getMessageById);
router.post("/:id", message_controller_1.updateMessage);
router.delete("/:id", message_controller_1.deleteMessage);
exports.default = router;
