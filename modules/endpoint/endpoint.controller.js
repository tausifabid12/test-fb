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
const automation_model_1 = __importDefault(require("../automation/automation.model"));
const accounts_model_1 = __importDefault(require("../accounts/accounts.model"));
const endpoint_helper_1 = require("./endpoint.helper");
const getRandomItemFromArray_1 = require("../../helpers/getRandomItemFromArray");
const VERIFY_TOKEN = "your_verify_token"; // Set this in App Dashboard
const APP_SECRET = "07edcf372dc928b170fc3f1a15d70c5b"; // Found in Meta Developer Console
// const APP_SECRET = "60e1159df179ff58ea6d1ca4596a0723"; // Found in Meta Developer Console
const PAGE_ACCESS_TOKEN = "EAAFzFylf8lMBOyzypGsnMVQTJbahntZAp1qVXPMvyqIMGFfjbVyIVpS8zZBqOZCmd9Cceqbsec49oudMarvg6QsLKAOtpAR6xm9oZA3E36Ni1FwMsI80nv30ghGMHPZCwlVlD2w1DqwHVnp02kY85SSPJi1oBHcar2ICUwBhZBX7O1TJyZCFGmiOFZCincPhkt2blhDSe3Kc46iLeMww0RGCHusVfqiUBl2YyCZCbs3kI"; // Page Access Token from Meta Developer Console
// Webhook Verification
function verifyWebhook(req, res) {
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
    }
    else {
        res.sendStatus(403);
    }
}
// // Handle Webhook Data (Page Events)
function handleWebhookData(req, res) {
    let body = req.body;
    console.log(req.body);
    if (body.object === "page") {
        body.entry.forEach((entry) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
            //  ================================ handle comment reply==============
            if ((_a = entry.changes) === null || _a === void 0 ? void 0 : _a.length) {
                let webhookEvent = entry.changes[0];
                console.log(webhookEvent.messaging[0], 'webhookEvent.messaging[0]');
                console.log((_b = webhookEvent.messaging[0]) === null || _b === void 0 ? void 0 : _b.sender[0], 'webhookEvent.messaging[0]?.sender[0]');
                console.log((_c = webhookEvent.messaging[0]) === null || _c === void 0 ? void 0 : _c.recipient[0], 'webhookEvent.messaging[0]?.recipient[0]');
                console.log((_d = webhookEvent.messaging[0]) === null || _d === void 0 ? void 0 : _d.message[0], 'webhookEvent.messaging[0]?.message[0]');
                // let webhookEvent = {
                //     time: 1741958489566,
                //     id: '526106077262052',
                //     messaging: [
                //         {
                //             sender: [Object],
                //             recipient: [Object],
                //             timestamp: 1741958241600,
                //             message: [Object]
                //         }
                //     ]
                // }
                if ((webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.field) == 'feed' && ((_e = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _e === void 0 ? void 0 : _e.item) == 'comment') {
                    let customerId = (_g = (_f = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _f === void 0 ? void 0 : _f.from) === null || _g === void 0 ? void 0 : _g.id;
                    let customerName = (_j = (_h = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _h === void 0 ? void 0 : _h.from) === null || _j === void 0 ? void 0 : _j.name;
                    let comment = (_k = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _k === void 0 ? void 0 : _k.message;
                    let comment_id = (_l = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _l === void 0 ? void 0 : _l.comment_id;
                    let post_id = (_m = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _m === void 0 ? void 0 : _m.post_id;
                    //============= find automation
                    const automation = yield automation_model_1.default.find({ postId: post_id });
                    let userId = (_o = automation[0]) === null || _o === void 0 ? void 0 : _o.userId;
                    let pageId = (_p = automation[0]) === null || _p === void 0 ? void 0 : _p.pageId;
                    let replies = (_q = automation[0]) === null || _q === void 0 ? void 0 : _q.commentReplies;
                    let outOfStockReplies = (_r = automation[0]) === null || _r === void 0 ? void 0 : _r.outOfStockReplies;
                    let automationType = (_s = automation[0]) === null || _s === void 0 ? void 0 : _s.automationType;
                    let productsIds = (_t = automation[0]) === null || _t === void 0 ? void 0 : _t.productsIds;
                    let keywords = (_u = automation[0]) === null || _u === void 0 ? void 0 : _u.keywords;
                    let replyMessageArray = replies;
                    if (automationType == 'Product_automation') {
                        let isStockAvailable = (0, endpoint_helper_1.checkProductStock)(productsIds);
                        console.log(isStockAvailable, 'accountData');
                        if (!isStockAvailable) {
                            replyMessageArray = outOfStockReplies;
                        }
                    }
                    // ========= find user account for access token
                    let accountData = yield accounts_model_1.default.find({ userId });
                    console.log(accountData, 'accountData');
                    let accessToken = (_v = accountData[0]) === null || _v === void 0 ? void 0 : _v.accessToken;
                    // ================ get all pages with page access token
                    const pageData = yield (0, endpoint_helper_1.getPagesToken)(accessToken, pageId);
                    const pageAccessToken = pageData === null || pageData === void 0 ? void 0 : pageData.access_token;
                    console.log(pageAccessToken, 'pageAccessToken');
                    let randomReplyMessage = (0, getRandomItemFromArray_1.getRandomItem)(replyMessageArray);
                    console.log(randomReplyMessage, 'randomReplyMessage');
                    // ================ reply to comment
                    const result = yield (0, endpoint_helper_1.replyToComment)(pageAccessToken, comment_id, randomReplyMessage);
                    console.log(result, '||||||||||||| ++++++++++++++++++ |||||||||||||||');
                }
            }
            console.log("Webhook event:", entry);
        }));
        res.status(200).send("EVENT_RECEIVED");
    }
    else {
        res.sendStatus(404);
    }
    // const signature = req.headers["x-hub-signature-256"] as string;
    // if (!verifySignature(req.body, signature)) {
    //     console.error("Invalid signature, request rejected.");
    //     // return res.sendStatus(403);
    // }
    // console.log("Webhook received:", JSON.stringify(req.body, null, 2));
    // // Process Webhook Event
    // if (req.body.object === "page") {
    //     req.body.entry.forEach((entry: any) => {
    //         entry.changes.forEach((change: any) => {
    //             if (change.field === "feed") {
    //                 console.log(change.value, "||||||||||||||||||||||||||||||||||||||||||| +++++++++++++++++++")
    //                 // handlePageFeedEvent(change.value);
    //             }
    //         });
    //     });
    // }
    res.sendStatus(200);
}
// // Handle Page Feed Events (Posts, Comments, Likes)
// async function handlePageFeedEvent(event: any) {
//     console.log("Page Feed Event:", event);
//     const { item, post_id, message, from } = event;
//     if (item === "post") {
//         console.log(`New post by ${from.name}: ${message}`);
//         // Auto-comment on new posts
//         await commentOnPost(post_id, "Thank you for posting!");
//     }
// }
// // Comment on a Facebook Page Post
// async function commentOnPost(postId: string, message: string) {
//     try {
//         const url = `https://graph.facebook.com/${postId}/comments`;
//         const response = await axios.post(url, {
//             message,
//             access_token: PAGE_ACCESS_TOKEN,
//         });
//         console.log("Comment posted:", response.data);
//     } catch (error: any) {
//         console.error("Error posting comment:", error.response?.data || error.message);
//     }
// }
// // Signature verification function
// function verifySignature(payload: any, signature: string | undefined): boolean {
//     if (!signature) return false;
//     const receivedHash = signature.split("=")[1];
//     if (!receivedHash) return false;
//     const expectedHash = crypto
//         .createHmac("sha256", APP_SECRET)
//         .update(JSON.stringify(payload))
//         .digest("hex");
//     return receivedHash === expectedHash;
// }
// // Subscribe App to Page Webhooks
// export async function subscribeAppToPage(pageId: string) {
//     try {
//         const url = `https://graph.facebook.com/${pageId}/subscribed_apps?subscribed_fields=feed,messages&access_token=${PAGE_ACCESS_TOKEN}`;
//         const response = await axios.post(url);
//         console.log("Successfully subscribed to page:", response.data);
//     } catch (error: any) {
//         console.error("Error subscribing to page:", error.response?.data || error.message);
//     }
// }
