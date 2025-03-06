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
exports.deleteSubscriptionFromDb = exports.updateSubscriptionInDb = exports.getSubscriptionByIdFromDb = exports.getSubscriptionsFromDb = exports.createSubscriptionInDb = void 0;
const subscription_model_1 = __importDefault(require("./subscription.model"));
// Create a new Subscription
const createSubscriptionInDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscription_model_1.default.create(data);
});
exports.createSubscriptionInDb = createSubscriptionInDb;
// Get all Subscriptions
const getSubscriptionsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscription_model_1.default.find();
});
exports.getSubscriptionsFromDb = getSubscriptionsFromDb;
// Get a single Subscription by ID
const getSubscriptionByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscription_model_1.default.findById(id);
});
exports.getSubscriptionByIdFromDb = getSubscriptionByIdFromDb;
// Update a Subscription by ID
const updateSubscriptionInDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscription_model_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updateSubscriptionInDb = updateSubscriptionInDb;
// Delete a Subscription by ID
const deleteSubscriptionFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscription_model_1.default.findByIdAndDelete(id);
});
exports.deleteSubscriptionFromDb = deleteSubscriptionFromDb;
