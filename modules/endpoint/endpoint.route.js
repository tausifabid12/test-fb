"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const endpoint_controller_1 = require("./endpoint.controller");
const router = (0, express_1.Router)();
// Route for webhook verification
// router.get('/facebook-webhook', verifyWebhook);
// Route for handling webhook events
router.get('/facebook-webhook', endpoint_controller_1.handleWebhookData);
// // verification
// router.get('/messenger-webhook', verifyMessengerWebhook);
// //  events
// router.post('/messenger-webhook', handleMessengerWebhookdata);
exports.default = router;
