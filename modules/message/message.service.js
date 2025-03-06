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
exports.deleteMessageFromDb = exports.updateMessageInDb = exports.getMessageByIdFromDb = exports.getMessagesFromDb = exports.createMessageInDb = void 0;
const message_model_1 = __importDefault(require("./message.model"));
// Create a new Message
const createMessageInDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield message_model_1.default.create(data);
});
exports.createMessageInDb = createMessageInDb;
// Get all Messages
const getMessagesFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield message_model_1.default.find();
});
exports.getMessagesFromDb = getMessagesFromDb;
// Get a single Message by ID
const getMessageByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield message_model_1.default.findById(id);
});
exports.getMessageByIdFromDb = getMessageByIdFromDb;
// Update a Message by ID
const updateMessageInDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield message_model_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updateMessageInDb = updateMessageInDb;
// Delete a Message by ID
const deleteMessageFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield message_model_1.default.findByIdAndDelete(id);
});
exports.deleteMessageFromDb = deleteMessageFromDb;
