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
exports.deleteSubscription = exports.updateSubscription = exports.getSubscriptionById = exports.getSubscriptions = exports.createSubscription = void 0;
const subscription_service_1 = require("./subscription.service");
// Create a new Subscription
const createSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Subscription = yield (0, subscription_service_1.createSubscriptionInDb)(req.body);
        res.status(201).json(Subscription);
    }
    catch (error) {
        res.status(400).json({ message: "Error creating user flow", error });
    }
});
exports.createSubscription = createSubscription;
// Get all Subscriptions
const getSubscriptions = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Subscriptions = yield (0, subscription_service_1.getSubscriptionsFromDb)();
        res.json(Subscriptions);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user flows", error });
    }
});
exports.getSubscriptions = getSubscriptions;
// Get a single Subscription by ID
const getSubscriptionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Subscription = yield (0, subscription_service_1.getSubscriptionByIdFromDb)(req.params.id);
        if (!Subscription) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Subscription);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user flow", error });
    }
});
exports.getSubscriptionById = getSubscriptionById;
// Update a Subscription by ID
const updateSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Subscription = yield (0, subscription_service_1.updateSubscriptionInDb)(req.params.id, req.body);
        if (!Subscription) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Subscription);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user flow", error });
    }
});
exports.updateSubscription = updateSubscription;
// Delete a Subscription by ID
const deleteSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Subscription = yield (0, subscription_service_1.deleteSubscriptionFromDb)(req.params.id);
        if (!Subscription) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user flow", error });
    }
});
exports.deleteSubscription = deleteSubscription;
