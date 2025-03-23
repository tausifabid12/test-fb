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
const leads_model_1 = __importDefault(require("../leads/leads.model"));
const VERIFY_TOKEN = "your_verify_token";
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
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        let body = req.body;
        console.log(req.body, 'body');
        if (body.object === "page") {
            console.log(body.object, 'page');
            let entry = body.entry[0];
            // *********************************** Comment Automation Process start ***********************************************
            if (entry.changes && ((_a = entry.changes) === null || _a === void 0 ? void 0 : _a.length)) {
                let webhookEvent = entry.changes[0];
                console.log(webhookEvent, 'page      ++++++++++++ entry');
                if ((webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.field) == 'feed' && ((_b = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _b === void 0 ? void 0 : _b.item) == 'comment') {
                    let customerId = (_d = (_c = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _c === void 0 ? void 0 : _c.from) === null || _d === void 0 ? void 0 : _d.id;
                    let customerName = (_f = (_e = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _e === void 0 ? void 0 : _e.from) === null || _f === void 0 ? void 0 : _f.name;
                    let comment = (_g = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _g === void 0 ? void 0 : _g.message;
                    let comment_id = (_h = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _h === void 0 ? void 0 : _h.comment_id;
                    let post_id = (_j = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _j === void 0 ? void 0 : _j.post_id;
                    //============= find automation
                    const automation = yield automation_model_1.default.find({ postId: post_id });
                    let userId = (_k = automation[0]) === null || _k === void 0 ? void 0 : _k.userId;
                    let pageId = (_l = automation[0]) === null || _l === void 0 ? void 0 : _l.pageId;
                    let replies = (_m = automation[0]) === null || _m === void 0 ? void 0 : _m.commentReplies;
                    let outOfStockReplies = (_o = automation[0]) === null || _o === void 0 ? void 0 : _o.outOfStockReplies;
                    let automationType = (_p = automation[0]) === null || _p === void 0 ? void 0 : _p.automationType;
                    let productsIds = (_q = automation[0]) === null || _q === void 0 ? void 0 : _q.productsIds;
                    let keywords = (_r = automation[0]) === null || _r === void 0 ? void 0 : _r.keywords;
                    if (customerId == pageId) {
                        console.log('same page comment +++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                        res.sendStatus(200);
                        return;
                    }
                    //    ======================================= check if comment has any  keyword ===========================
                    const isKeywordExists = (0, endpoint_helper_1.containsKeyword)(keywords, comment);
                    console.log(isKeywordExists, keywords, comment, '||||||||||||| isKeywordExists ++++++++++++++++++ |||||||||||||||');
                    if (isKeywordExists) {
                        let replyMessageArray = replies;
                        if (automationType == 'Product_automation') {
                            let isStockAvailable = yield (0, endpoint_helper_1.checkProductStock)(productsIds);
                            console.log(isStockAvailable, 'isStockAvailable ||||||||||');
                            if (!isStockAvailable) {
                                replyMessageArray = outOfStockReplies;
                            }
                        }
                        // ========= find user account for access token======================================
                        let accountData = yield accounts_model_1.default.find({ userId });
                        console.log(accountData, "accountData |||||||||||||||");
                        let account_accessToken = (_s = accountData[0]) === null || _s === void 0 ? void 0 : _s.accessToken;
                        // ================ get all pages with page access token=============================
                        let pageData = (_u = (_t = accountData[0]) === null || _t === void 0 ? void 0 : _t.pages) === null || _u === void 0 ? void 0 : _u.find(item => item.id == pageId);
                        console.log(pageData, "pageData |||||||||||||||");
                        const pageAccessToken = pageData === null || pageData === void 0 ? void 0 : pageData.access_token;
                        // const pageData = await getPagesToken(accessToken, pageId)
                        // const pageAccessToken = pageData?.access_token
                        // ============================== reply to comment===================================
                        let randomReplyMessage = (0, getRandomItemFromArray_1.getRandomItem)(replyMessageArray);
                        const result = yield (0, endpoint_helper_1.replyToComment)(pageAccessToken, comment_id, randomReplyMessage);
                        console.log(result, '||||||||||||| result ++++++++++++++++++ |||||||||||||||');
                        //=============================== send product details message =====================
                        const messageResult = yield (0, endpoint_helper_1.sendProductDetailsMessage)(pageAccessToken, customerId, productsIds);
                        console.log(messageResult, ' messageResult||||||||||||| ++++++++++++++++++ |||||||||||||||');
                    }
                    // ==================== save commenter as a lead
                    let leadsData = yield leads_model_1.default.find({ profileId: customerId });
                    if (leadsData && ((_v = leadsData[0]) === null || _v === void 0 ? void 0 : _v._id)) {
                        let newLead = {
                            name: customerName,
                            profileId: customerId,
                            email: "",
                            phone: "",
                            profileUrl: "",
                            interestedPostIds: [...(_w = leadsData[0]) === null || _w === void 0 ? void 0 : _w.interestedPostIds, post_id],
                            interestedProductId: [...(_x = leadsData[0]) === null || _x === void 0 ? void 0 : _x.interestedProductId, ...productsIds],
                            isCustomer: false,
                            orderCount: 0,
                            orderIds: [],
                            address: "",
                            state: "",
                            city: "",
                            source: "facebook"
                        };
                        leads_model_1.default.findByIdAndUpdate((_y = leadsData[0]) === null || _y === void 0 ? void 0 : _y._id, newLead, { new: true });
                    }
                    else {
                        let newLead = {
                            name: customerName || "",
                            profileId: customerId,
                            email: "",
                            phone: "",
                            profileUrl: "",
                            interestedPostIds: [post_id],
                            interestedProductId: productsIds,
                            isCustomer: false,
                            orderCount: 0,
                            orderIds: [],
                            address: "",
                            state: "",
                            city: "",
                            source: "facebook"
                        };
                        yield leads_model_1.default.create(newLead);
                    }
                }
                res.sendStatus(200);
                return;
            }
            // ***********************************  automation Process end ***********************************************
            // ================================== handle message ==========================================
            // if (entry.messaging && entry.messaging?.length) {
            //     let messagingData = req.body?.entry[0]?.messaging[0]
            //     const time = messagingData?.time
            //     const senderId = messagingData?.sender?.id
            //     const recipientId = messagingData?.recipient?.id
            //     const messageId = messagingData?.message?.mid
            //     const message = messagingData?.message?.text
            //     let accountData = await Account.find({ profileId: recipientId });
            //     const userId = accountData[0]?.userId
            //     const username = accountData[0]?.name
            //     //============= check if user is a lead ======================
            //     let leadsData = await Lead.find({ profileId: senderId });
            //     let leadName = leadsData[0]?.name
            //     if (leadName) {
            //         //============== check for previous messages
            //         let oldMessageData = await Message.find({ senderProfileId: senderId });
            //         let messageData
            //         if (oldMessageData[0]?._id) {
            //             let oldMessages = oldMessageData[0]?.messages
            //             messageData = {
            //                 "userId": userId,
            //                 "userName": username,
            //                 "receiverProfileId": recipientId,
            //                 "senderProfileId": senderId,
            //                 "senderName": "Alice Smith",
            //                 messages: [...oldMessages,
            //                 {
            //                     messageText: message,
            //                     imageUrl: "",
            //                     videoUrl: "",
            //                     type: "text",
            //                     messageId: messageId,
            //                     isSeen: false,
            //                     time: time,
            //                     echo: false
            //                 }]
            //             }
            //             await Message.findByIdAndUpdate(oldMessageData[0]?._id, messageData, { new: true });
            //         } else {
            //             messageData = {
            //                 "userId": userId,
            //                 "userName": username,
            //                 "receiverProfileId": recipientId,
            //                 "senderProfileId": senderId,
            //                 "senderName": "Alice Smith",
            //                 messages: [
            //                     {
            //                         messageText: message,
            //                         imageUrl: "",
            //                         videoUrl: "",
            //                         type: "text",
            //                         messageId: messageId,
            //                         isSeen: false,
            //                         time: time,
            //                         echo: false
            //                     }
            //                 ]
            //             }
            //             await Message.create(messageData);
            //         }
            //     }
            // }
        }
        else {
        }
        res.sendStatus(200);
    });
}
