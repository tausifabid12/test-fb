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
const message_model_1 = __importDefault(require("../message/message.model"));
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
    let body = req.body;
    if (body.object === "page") {
        body.entry.forEach((entry) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
            // *********************************** Comment Automation Process start ***********************************************
            if (entry.changes && ((_a = entry.changes) === null || _a === void 0 ? void 0 : _a.length)) {
                let webhookEvent = entry.changes[0];
                if ((webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.field) == 'feed' && ((_b = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _b === void 0 ? void 0 : _b.item) == 'comment') {
                    let customerId = (_d = (_c = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _c === void 0 ? void 0 : _c.from) === null || _d === void 0 ? void 0 : _d.id;
                    let customerName = (_f = (_e = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _e === void 0 ? void 0 : _e.from) === null || _f === void 0 ? void 0 : _f.name;
                    let comment = (_g = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _g === void 0 ? void 0 : _g.message;
                    let comment_id = (_h = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _h === void 0 ? void 0 : _h.comment_id;
                    let post_id = (_j = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _j === void 0 ? void 0 : _j.post_id;
                    //============= find automation
                    const automation = yield automation_model_1.default.find({ postId: post_id });
                    console.log(automation, 'automation +++++++++++++++++++++++++++');
                    let userId = (_k = automation[0]) === null || _k === void 0 ? void 0 : _k.userId;
                    let pageId = (_l = automation[0]) === null || _l === void 0 ? void 0 : _l.pageId;
                    let replies = (_m = automation[0]) === null || _m === void 0 ? void 0 : _m.commentReplies;
                    let outOfStockReplies = (_o = automation[0]) === null || _o === void 0 ? void 0 : _o.outOfStockReplies;
                    let automationType = (_p = automation[0]) === null || _p === void 0 ? void 0 : _p.automationType;
                    let productsIds = (_q = automation[0]) === null || _q === void 0 ? void 0 : _q.productsIds;
                    let keywords = (_r = automation[0]) === null || _r === void 0 ? void 0 : _r.keywords;
                    let replyMessageArray = replies;
                    if (automationType == 'Product_automation') {
                        let isStockAvailable = (0, endpoint_helper_1.checkProductStock)(productsIds);
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
                    //=============================== send product details message =====================
                    const messageResult = yield (0, endpoint_helper_1.sendProductDetailsMessage)(pageAccessToken, customerId, productsIds);
                    console.log(result, '||||||||||||| result ++++++++++++++++++ |||||||||||||||');
                    console.log(messageResult, ' messageResult||||||||||||| ++++++++++++++++++ |||||||||||||||');
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
            }
            // ***********************************  automation Process end ***********************************************
            // ================================== handle message ==========================================
            if (entry.messaging && ((_z = entry.messaging) === null || _z === void 0 ? void 0 : _z.length)) {
                let messagingData = (_1 = (_0 = req.body) === null || _0 === void 0 ? void 0 : _0.entry[0]) === null || _1 === void 0 ? void 0 : _1.messaging[0];
                const time = messagingData === null || messagingData === void 0 ? void 0 : messagingData.time;
                const senderId = (_2 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.sender) === null || _2 === void 0 ? void 0 : _2.id;
                const recipientId = (_3 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.recipient) === null || _3 === void 0 ? void 0 : _3.id;
                const messageId = (_4 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.message) === null || _4 === void 0 ? void 0 : _4.mid;
                const message = (_5 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.message) === null || _5 === void 0 ? void 0 : _5.text;
                let accountData = yield accounts_model_1.default.find({ profileId: recipientId });
                const userId = (_6 = accountData[0]) === null || _6 === void 0 ? void 0 : _6.userId;
                const username = (_7 = accountData[0]) === null || _7 === void 0 ? void 0 : _7.name;
                //============= check if user is a lead ======================
                let leadsData = yield leads_model_1.default.find({ profileId: senderId });
                let leadName = (_8 = leadsData[0]) === null || _8 === void 0 ? void 0 : _8.name;
                if (leadName) {
                    //============== check for previous messages
                    let oldMessageData = yield message_model_1.default.find({ senderProfileId: senderId });
                    let messageData;
                    if ((_9 = oldMessageData[0]) === null || _9 === void 0 ? void 0 : _9._id) {
                        let oldMessages = (_10 = oldMessageData[0]) === null || _10 === void 0 ? void 0 : _10.messages;
                        messageData = {
                            "userId": userId,
                            "userName": username,
                            "receiverProfileId": recipientId,
                            "senderProfileId": senderId,
                            "senderName": "Alice Smith",
                            messages: [...oldMessages,
                                {
                                    messageText: message,
                                    imageUrl: "",
                                    videoUrl: "",
                                    type: "text",
                                    messageId: messageId,
                                    isSeen: false,
                                    time: time,
                                    echo: false
                                }]
                        };
                        yield message_model_1.default.findByIdAndUpdate((_11 = oldMessageData[0]) === null || _11 === void 0 ? void 0 : _11._id, messageData, { new: true });
                    }
                    else {
                        messageData = {
                            "userId": userId,
                            "userName": username,
                            "receiverProfileId": recipientId,
                            "senderProfileId": senderId,
                            "senderName": "Alice Smith",
                            messages: [
                                {
                                    messageText: message,
                                    imageUrl: "",
                                    videoUrl: "",
                                    type: "text",
                                    messageId: messageId,
                                    isSeen: false,
                                    time: time,
                                    echo: false
                                }
                            ]
                        };
                        yield message_model_1.default.create(messageData);
                    }
                }
            }
        }));
    }
    else {
    }
    res.sendStatus(200);
}
