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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.updateMessage = exports.getMessageById = exports.getMessages = exports.createMessage = void 0;
const message_service_1 = require("./message.service");
// Create a new Message
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Message = yield (0, message_service_1.createMessageInDb)(req.body);
        res.status(201).json(Message);
    }
    catch (error) {
        res.status(400).json({ message: "Error creating user flow", error });
    }
});
exports.createMessage = createMessage;
// Get all Messages
const getMessages = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Messages = yield (0, message_service_1.getMessagesFromDb)();
        res.json(Messages);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user flows", error });
    }
});
exports.getMessages = getMessages;
// Get a single Message by ID
const getMessageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Message = yield (0, message_service_1.getMessageByIdFromDb)(req.params.id);
        if (!Message) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Message);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user flow", error });
    }
});
exports.getMessageById = getMessageById;
// Update a Message by ID
const updateMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Message = yield (0, message_service_1.updateMessageInDb)(req.params.id, req.body);
        if (!Message) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Message);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user flow", error });
    }
});
exports.updateMessage = updateMessage;
// Delete a Message by ID
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Message = yield (0, message_service_1.deleteMessageFromDb)(req.params.id);
        if (!Message) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user flow", error });
    }
});
exports.deleteMessage = deleteMessage;
