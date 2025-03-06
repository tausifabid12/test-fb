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
exports.verifyWebhook = verifyWebhook;
exports.handleWebhookData = handleWebhookData;
exports.subscribeAppToPage = subscribeAppToPage;
const crypto_1 = __importDefault(require("crypto"));
const axios_1 = __importDefault(require("axios"));
const VERIFY_TOKEN = "your_verify_token"; // Set this in App Dashboard
const APP_SECRET = "07edcf372dc928b170fc3f1a15d70c5b"; // Found in Meta Developer Console
// const APP_SECRET = "60e1159df179ff58ea6d1ca4596a0723"; // Found in Meta Developer Console
const PAGE_ACCESS_TOKEN = "EAAFzFylf8lMBOyzypGsnMVQTJbahntZAp1qVXPMvyqIMGFfjbVyIVpS8zZBqOZCmd9Cceqbsec49oudMarvg6QsLKAOtpAR6xm9oZA3E36Ni1FwMsI80nv30ghGMHPZCwlVlD2w1DqwHVnp02kY85SSPJi1oBHcar2ICUwBhZBX7O1TJyZCFGmiOFZCincPhkt2blhDSe3Kc46iLeMww0RGCHusVfqiUBl2YyCZCbs3kI"; // Page Access Token from Meta Developer Console
// Webhook Verification
function verifyWebhook(req, res) {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("Webhook verified successfully!");
        res.status(200).send(challenge);
    }
    else {
        console.error("Webhook verification failed.");
        res.sendStatus(403);
    }
}
// Handle Webhook Data (Page Events)
function handleWebhookData(req, res) {
    const signature = req.headers["x-hub-signature-256"];
    if (!verifySignature(req.body, signature)) {
        console.error("Invalid signature, request rejected.");
        // return res.sendStatus(403);
    }
    console.log("Webhook received:", JSON.stringify(req.body, null, 2));
    // Process Webhook Event
    if (req.body.object === "page") {
        req.body.entry.forEach((entry) => {
            entry.changes.forEach((change) => {
                if (change.field === "feed") {
                    console.log(change.value, "||||||||||||||||||||||||||||||||||||||||||| +++++++++++++++++++");
                    // handlePageFeedEvent(change.value);
                }
            });
        });
    }
    res.sendStatus(200);
}
// Handle Page Feed Events (Posts, Comments, Likes)
function handlePageFeedEvent(event) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Page Feed Event:", event);
        const { item, post_id, message, from } = event;
        if (item === "post") {
            console.log(`New post by ${from.name}: ${message}`);
            // Auto-comment on new posts
            yield commentOnPost(post_id, "Thank you for posting!");
        }
    });
}
// Comment on a Facebook Page Post
function commentOnPost(postId, message) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const url = `https://graph.facebook.com/${postId}/comments`;
            const response = yield axios_1.default.post(url, {
                message,
                access_token: PAGE_ACCESS_TOKEN,
            });
            console.log("Comment posted:", response.data);
        }
        catch (error) {
            console.error("Error posting comment:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        }
    });
}
// Signature verification function
function verifySignature(payload, signature) {
    if (!signature)
        return false;
    const receivedHash = signature.split("=")[1];
    if (!receivedHash)
        return false;
    const expectedHash = crypto_1.default
        .createHmac("sha256", APP_SECRET)
        .update(JSON.stringify(payload))
        .digest("hex");
    return receivedHash === expectedHash;
}
// Subscribe App to Page Webhooks
function subscribeAppToPage(pageId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const url = `https://graph.facebook.com/${pageId}/subscribed_apps?subscribed_fields=feed,messages&access_token=${PAGE_ACCESS_TOKEN}`;
            const response = yield axios_1.default.post(url);
            console.log("Successfully subscribed to page:", response.data);
        }
        catch (error) {
            console.error("Error subscribing to page:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        }
    });
}
