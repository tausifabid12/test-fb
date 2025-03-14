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
exports.verifyWebhook = verifyWebhook;
exports.handleWebhookData = handleWebhookData;
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
    if (body.object === "page") {
        body.entry.forEach((entry) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            //  ================================ handle comment reply==============
            if (entry.changes && ((_a = entry.changes) === null || _a === void 0 ? void 0 : _a.length)) {
                let webhookEvent = entry.changes[0];
                console.log(webhookEvent.messaging[0], 'webhookEvent.messaging[0]');
                console.log((_b = webhookEvent.messaging[0]) === null || _b === void 0 ? void 0 : _b.sender[0], 'webhookEvent.messaging[0]?.sender[0]');
                console.log((_c = webhookEvent.messaging[0]) === null || _c === void 0 ? void 0 : _c.recipient[0], 'webhookEvent.messaging[0]?.recipient[0]');
                console.log((_d = webhookEvent.messaging[0]) === null || _d === void 0 ? void 0 : _d.message[0], 'webhookEvent.messaging[0]?.message[0]');
                // if (webhookEvent?.field == 'feed' && webhookEvent?.value?.item == 'comment') {
                //     let customerId = webhookEvent?.value?.from?.id
                //     let customerName = webhookEvent?.value?.from?.name
                //     let comment = webhookEvent?.value?.message
                //     let comment_id = webhookEvent?.value?.comment_id
                //     let post_id = webhookEvent?.value?.post_id
                //     //============= find automation
                //     const automation = await Automation.find({ postId: post_id })
                //     let userId = automation[0]?.userId
                //     let pageId = automation[0]?.pageId
                //     let replies = automation[0]?.commentReplies
                //     let outOfStockReplies = automation[0]?.outOfStockReplies
                //     let automationType = automation[0]?.automationType
                //     let productsIds = automation[0]?.productsIds
                //     let keywords = automation[0]?.keywords
                //     let replyMessageArray = replies
                //     if (automationType == 'Product_automation') {
                //         let isStockAvailable = checkProductStock(productsIds)
                //         console.log(isStockAvailable, 'accountData')
                //         if (!isStockAvailable) {
                //             replyMessageArray = outOfStockReplies
                //         }
                //     }
                //     // ========= find user account for access token
                //     let accountData = await Account.find({ userId });
                //     console.log(accountData, 'accountData')
                //     let accessToken = accountData[0]?.accessToken
                //     // ================ get all pages with page access token
                //     const pageData = await getPagesToken(accessToken, pageId)
                //     const pageAccessToken = pageData?.access_token
                //     console.log(pageAccessToken, 'pageAccessToken')
                //     let randomReplyMessage = getRandomItem(replyMessageArray)
                //     console.log(randomReplyMessage, 'randomReplyMessage')
                //     // ================ reply to comment
                //     const result = await replyToComment(pageAccessToken, comment_id, randomReplyMessage)
                //     console.log(result, '||||||||||||| ++++++++++++++++++ |||||||||||||||')
                // }
            }
            if (entry.messaging && ((_e = entry.messaging) === null || _e === void 0 ? void 0 : _e.length)) {
                console.log(true, "||||||||||||||||||||||||||||||||||||||||||||||||");
            }
            console.log("Webhook event:", entry);
            // let entry = req.body?.entry[0]?.messaging[0]
            let messagingData = (_g = (_f = req.body) === null || _f === void 0 ? void 0 : _f.entry[0]) === null || _g === void 0 ? void 0 : _g.messaging[0];
            const senderId = (_h = messagingData === null || messagingData === void 0 ? void 0 : messagingData.sender) === null || _h === void 0 ? void 0 : _h.id;
            const recipientId = (_j = messagingData === null || messagingData === void 0 ? void 0 : messagingData.recipient) === null || _j === void 0 ? void 0 : _j.id;
            const messageId = (_k = messagingData === null || messagingData === void 0 ? void 0 : messagingData.message) === null || _k === void 0 ? void 0 : _k.mid;
            const message = (_l = messagingData === null || messagingData === void 0 ? void 0 : messagingData.message) === null || _l === void 0 ? void 0 : _l.text;
            console.log(senderId, recipientId, messageId, message);
        }));
        // res.status(200).send("EVENT_RECEIVED");
    }
    else {
        // res.sendStatus(404);
    }
    // console.log(req.body?.entry[0]?.messaging[0])
    // console.log(req.body?.entry[0]?.messaging[0]?.sender[0])
    // console.log(req.body?.entry[0]?.messaging[0]?.recipient[0])
    // console.log(req.body?.entry[0]?.messaging[0]?.message[0])
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
