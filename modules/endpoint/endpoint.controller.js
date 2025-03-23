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
exports.handleWebhookDataCope = handleWebhookDataCope;
exports.handleWebhookDataCope2 = handleWebhookDataCope2;
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
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
        let body = req.body;
        console.log(req.body, 'body');
        if (body.object === "page") {
            console.log(body.object, 'page');
            let entry = body.entry[0];
            // *********************************** Comment Automation Process start ***********************************************
            if (entry.changes && ((_a = entry.changes) === null || _a === void 0 ? void 0 : _a.length)) {
                let webhookEvent = entry.changes[0];
                console.log(webhookEvent, 'page      ++++++++++++ entry');
                console.log((webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.field) == 'feed' && ((_b = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _b === void 0 ? void 0 : _b.item) == 'comment', "page webhookEvent?.field == 'feed' && webhookEvent?.value?.item == 'comment'      ++++++++++++ entry");
                if ((webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.field) == 'feed' && ((_c = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _c === void 0 ? void 0 : _c.item) == 'comment') {
                    let customerId = (_e = (_d = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _d === void 0 ? void 0 : _d.from) === null || _e === void 0 ? void 0 : _e.id;
                    let customerName = (_g = (_f = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _f === void 0 ? void 0 : _f.from) === null || _g === void 0 ? void 0 : _g.name;
                    let comment = (_h = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _h === void 0 ? void 0 : _h.message;
                    let comment_id = (_j = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _j === void 0 ? void 0 : _j.comment_id;
                    let post_id = (_k = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _k === void 0 ? void 0 : _k.post_id;
                    console.log(post_id, 'post_id +++++++++++++++++++++++++++', (webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.field) == 'feed' && ((_l = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _l === void 0 ? void 0 : _l.item) == 'comment');
                    console.log('here }}}}}}}}}}}}}}}');
                    //============= find automation
                    const automation = yield automation_model_1.default.find({ postId: post_id });
                    console.log('here }}}}}}}}}}}}}}} _____________________');
                    console.log(automation, 'automation +++++++++++++++++++++++++++ ___________________________ ');
                    let userId = (_m = automation[0]) === null || _m === void 0 ? void 0 : _m.userId;
                    let pageId = (_o = automation[0]) === null || _o === void 0 ? void 0 : _o.pageId;
                    let replies = (_p = automation[0]) === null || _p === void 0 ? void 0 : _p.commentReplies;
                    let outOfStockReplies = (_q = automation[0]) === null || _q === void 0 ? void 0 : _q.outOfStockReplies;
                    let automationType = (_r = automation[0]) === null || _r === void 0 ? void 0 : _r.automationType;
                    let productsIds = (_s = automation[0]) === null || _s === void 0 ? void 0 : _s.productsIds;
                    let keywords = (_t = automation[0]) === null || _t === void 0 ? void 0 : _t.keywords;
                    //    ======================================= check if comment has any  keyword ===========================
                    const isKeywordExists = (0, endpoint_helper_1.containsKeyword)(keywords, comment);
                    console.log(isKeywordExists, '||||||||||||| isKeywordExists ++++++++++++++++++ |||||||||||||||');
                    if (isKeywordExists) {
                        console.log('here }}}}}}}}}}}}}}} 99999999999999');
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
                        let account_accessToken = (_u = accountData[0]) === null || _u === void 0 ? void 0 : _u.accessToken;
                        // ================ get all pages with page access token=============================
                        let pageData = (_w = (_v = accountData[0]) === null || _v === void 0 ? void 0 : _v.pages) === null || _w === void 0 ? void 0 : _w.find(item => item.id == pageId);
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
                    if (leadsData && ((_x = leadsData[0]) === null || _x === void 0 ? void 0 : _x._id)) {
                        let newLead = {
                            name: customerName,
                            profileId: customerId,
                            email: "",
                            phone: "",
                            profileUrl: "",
                            interestedPostIds: [...(_y = leadsData[0]) === null || _y === void 0 ? void 0 : _y.interestedPostIds, post_id],
                            interestedProductId: [...(_z = leadsData[0]) === null || _z === void 0 ? void 0 : _z.interestedProductId, ...productsIds],
                            isCustomer: false,
                            orderCount: 0,
                            orderIds: [],
                            address: "",
                            state: "",
                            city: "",
                            source: "facebook"
                        };
                        leads_model_1.default.findByIdAndUpdate((_0 = leadsData[0]) === null || _0 === void 0 ? void 0 : _0._id, newLead, { new: true });
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
            if (entry.messaging && ((_1 = entry.messaging) === null || _1 === void 0 ? void 0 : _1.length)) {
                let messagingData = (_3 = (_2 = req.body) === null || _2 === void 0 ? void 0 : _2.entry[0]) === null || _3 === void 0 ? void 0 : _3.messaging[0];
                const time = messagingData === null || messagingData === void 0 ? void 0 : messagingData.time;
                const senderId = (_4 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.sender) === null || _4 === void 0 ? void 0 : _4.id;
                const recipientId = (_5 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.recipient) === null || _5 === void 0 ? void 0 : _5.id;
                const messageId = (_6 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.message) === null || _6 === void 0 ? void 0 : _6.mid;
                const message = (_7 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.message) === null || _7 === void 0 ? void 0 : _7.text;
                let accountData = yield accounts_model_1.default.find({ profileId: recipientId });
                const userId = (_8 = accountData[0]) === null || _8 === void 0 ? void 0 : _8.userId;
                const username = (_9 = accountData[0]) === null || _9 === void 0 ? void 0 : _9.name;
                //============= check if user is a lead ======================
                let leadsData = yield leads_model_1.default.find({ profileId: senderId });
                let leadName = (_10 = leadsData[0]) === null || _10 === void 0 ? void 0 : _10.name;
                if (leadName) {
                    //============== check for previous messages
                    let oldMessageData = yield message_model_1.default.find({ senderProfileId: senderId });
                    let messageData;
                    if ((_11 = oldMessageData[0]) === null || _11 === void 0 ? void 0 : _11._id) {
                        let oldMessages = (_12 = oldMessageData[0]) === null || _12 === void 0 ? void 0 : _12.messages;
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
                        yield message_model_1.default.findByIdAndUpdate((_13 = oldMessageData[0]) === null || _13 === void 0 ? void 0 : _13._id, messageData, { new: true });
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
        }
        else {
        }
        res.sendStatus(200);
    });
}
// ==========================================================================
function handleWebhookDataCope(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
        console.log('here ++++++++++++++++++++++++++++++++++++++++++++++++ |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
        let body = req.body;
        console.log(req.body, 'body');
        if (body.object === "page") {
            console.log(body.object, 'page');
            for (const entry of body.entry) {
                // *********************************** Comment Automation Process start ***********************************************
                if (entry.changes && ((_a = entry.changes) === null || _a === void 0 ? void 0 : _a.length)) {
                    let webhookEvent = entry.changes[0];
                    console.log(webhookEvent, 'page      ++++++++++++ entry');
                    console.log((webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.field) == 'feed' && ((_b = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _b === void 0 ? void 0 : _b.item) == 'comment', "page webhookEvent?.field == 'feed' && webhookEvent?.value?.item == 'comment'      ++++++++++++ entry");
                    if ((webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.field) == 'feed' && ((_c = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _c === void 0 ? void 0 : _c.item) == 'comment') {
                        let customerId = (_e = (_d = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _d === void 0 ? void 0 : _d.from) === null || _e === void 0 ? void 0 : _e.id;
                        let customerName = (_g = (_f = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _f === void 0 ? void 0 : _f.from) === null || _g === void 0 ? void 0 : _g.name;
                        let comment = (_h = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _h === void 0 ? void 0 : _h.message;
                        let comment_id = (_j = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _j === void 0 ? void 0 : _j.comment_id;
                        let post_id = (_k = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _k === void 0 ? void 0 : _k.post_id;
                        console.log(post_id, 'post_id +++++++++++++++++++++++++++', (webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.field) == 'feed' && ((_l = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _l === void 0 ? void 0 : _l.item) == 'comment');
                        console.log('here }}}}}}}}}}}}}}}');
                        //============= find automation
                        const automation = yield automation_model_1.default.find({ postId: post_id });
                        console.log('here }}}}}}}}}}}}}}} _____________________');
                        console.log(automation, 'automation +++++++++++++++++++++++++++ ___________________________ ');
                        let userId = (_m = automation[0]) === null || _m === void 0 ? void 0 : _m.userId;
                        let pageId = (_o = automation[0]) === null || _o === void 0 ? void 0 : _o.pageId;
                        let replies = (_p = automation[0]) === null || _p === void 0 ? void 0 : _p.commentReplies;
                        let outOfStockReplies = (_q = automation[0]) === null || _q === void 0 ? void 0 : _q.outOfStockReplies;
                        let automationType = (_r = automation[0]) === null || _r === void 0 ? void 0 : _r.automationType;
                        let productsIds = (_s = automation[0]) === null || _s === void 0 ? void 0 : _s.productsIds;
                        let keywords = (_t = automation[0]) === null || _t === void 0 ? void 0 : _t.keywords;
                        console.log('here }}}}}}}}}}}}}}} 99999999999999');
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
                        let account_accessToken = (_u = accountData[0]) === null || _u === void 0 ? void 0 : _u.accessToken;
                        // ================ get all pages with page access token=============================
                        let pageData = (_w = (_v = accountData[0]) === null || _v === void 0 ? void 0 : _v.pages) === null || _w === void 0 ? void 0 : _w.find(item => item.id == pageId);
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
                        if (leadsData && ((_x = leadsData[0]) === null || _x === void 0 ? void 0 : _x._id)) {
                            let newLead = {
                                name: customerName,
                                profileId: customerId,
                                email: "",
                                phone: "",
                                profileUrl: "",
                                interestedPostIds: [...(_y = leadsData[0]) === null || _y === void 0 ? void 0 : _y.interestedPostIds, post_id],
                                interestedProductId: [...(_z = leadsData[0]) === null || _z === void 0 ? void 0 : _z.interestedProductId, ...productsIds],
                                isCustomer: false,
                                orderCount: 0,
                                orderIds: [],
                                address: "",
                                state: "",
                                city: "",
                                source: "facebook"
                            };
                            leads_model_1.default.findByIdAndUpdate((_0 = leadsData[0]) === null || _0 === void 0 ? void 0 : _0._id, newLead, { new: true });
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
                if (entry.messaging && ((_1 = entry.messaging) === null || _1 === void 0 ? void 0 : _1.length)) {
                    let messagingData = (_3 = (_2 = req.body) === null || _2 === void 0 ? void 0 : _2.entry[0]) === null || _3 === void 0 ? void 0 : _3.messaging[0];
                    const time = messagingData === null || messagingData === void 0 ? void 0 : messagingData.time;
                    const senderId = (_4 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.sender) === null || _4 === void 0 ? void 0 : _4.id;
                    const recipientId = (_5 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.recipient) === null || _5 === void 0 ? void 0 : _5.id;
                    const messageId = (_6 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.message) === null || _6 === void 0 ? void 0 : _6.mid;
                    const message = (_7 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.message) === null || _7 === void 0 ? void 0 : _7.text;
                    let accountData = yield accounts_model_1.default.find({ profileId: recipientId });
                    const userId = (_8 = accountData[0]) === null || _8 === void 0 ? void 0 : _8.userId;
                    const username = (_9 = accountData[0]) === null || _9 === void 0 ? void 0 : _9.name;
                    //============= check if user is a lead ======================
                    let leadsData = yield leads_model_1.default.find({ profileId: senderId });
                    let leadName = (_10 = leadsData[0]) === null || _10 === void 0 ? void 0 : _10.name;
                    if (leadName) {
                        //============== check for previous messages
                        let oldMessageData = yield message_model_1.default.find({ senderProfileId: senderId });
                        let messageData;
                        if ((_11 = oldMessageData[0]) === null || _11 === void 0 ? void 0 : _11._id) {
                            let oldMessages = (_12 = oldMessageData[0]) === null || _12 === void 0 ? void 0 : _12.messages;
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
                            yield message_model_1.default.findByIdAndUpdate((_13 = oldMessageData[0]) === null || _13 === void 0 ? void 0 : _13._id, messageData, { new: true });
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
            }
            body.entry.forEach((entry) => __awaiter(this, void 0, void 0, function* () {
                console.log(entry, 'page      ++++++++++++ entry');
            }));
        }
        else {
        }
        res.sendStatus(200);
    });
}
function handleWebhookDataCope2(req, res) {
    console.log('here ++++++++++++++++++++++++++++++++++++++++++++++++ |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
    let body = req.body;
    console.log(req.body, 'body');
    if (body.object === "page") {
        console.log(body.object, 'page');
        body.entry.forEach((entry) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
            console.log(entry, 'page      ++++++++++++ entry');
            // *********************************** Comment Automation Process start ***********************************************
            if (entry.changes && ((_a = entry.changes) === null || _a === void 0 ? void 0 : _a.length)) {
                let webhookEvent = entry.changes[0];
                console.log(webhookEvent, 'page      ++++++++++++ entry');
                console.log((webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.field) == 'feed' && ((_b = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _b === void 0 ? void 0 : _b.item) == 'comment', "page webhookEvent?.field == 'feed' && webhookEvent?.value?.item == 'comment'      ++++++++++++ entry");
                if ((webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.field) == 'feed' && ((_c = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _c === void 0 ? void 0 : _c.item) == 'comment') {
                    let customerId = (_e = (_d = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _d === void 0 ? void 0 : _d.from) === null || _e === void 0 ? void 0 : _e.id;
                    let customerName = (_g = (_f = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _f === void 0 ? void 0 : _f.from) === null || _g === void 0 ? void 0 : _g.name;
                    let comment = (_h = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _h === void 0 ? void 0 : _h.message;
                    let comment_id = (_j = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _j === void 0 ? void 0 : _j.comment_id;
                    let post_id = (_k = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _k === void 0 ? void 0 : _k.post_id;
                    console.log(post_id, 'post_id +++++++++++++++++++++++++++', (webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.field) == 'feed' && ((_l = webhookEvent === null || webhookEvent === void 0 ? void 0 : webhookEvent.value) === null || _l === void 0 ? void 0 : _l.item) == 'comment');
                    console.log('here }}}}}}}}}}}}}}}');
                    //============= find automation
                    const automation = yield automation_model_1.default.find({ postId: post_id });
                    console.log('here }}}}}}}}}}}}}}} _____________________');
                    console.log(automation, 'automation +++++++++++++++++++++++++++ ___________________________ ');
                    let userId = (_m = automation[0]) === null || _m === void 0 ? void 0 : _m.userId;
                    let pageId = (_o = automation[0]) === null || _o === void 0 ? void 0 : _o.pageId;
                    let replies = (_p = automation[0]) === null || _p === void 0 ? void 0 : _p.commentReplies;
                    let outOfStockReplies = (_q = automation[0]) === null || _q === void 0 ? void 0 : _q.outOfStockReplies;
                    let automationType = (_r = automation[0]) === null || _r === void 0 ? void 0 : _r.automationType;
                    let productsIds = (_s = automation[0]) === null || _s === void 0 ? void 0 : _s.productsIds;
                    let keywords = (_t = automation[0]) === null || _t === void 0 ? void 0 : _t.keywords;
                    console.log('here }}}}}}}}}}}}}}} 99999999999999');
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
                    let account_accessToken = (_u = accountData[0]) === null || _u === void 0 ? void 0 : _u.accessToken;
                    // ================ get all pages with page access token=============================
                    let pageData = (_w = (_v = accountData[0]) === null || _v === void 0 ? void 0 : _v.pages) === null || _w === void 0 ? void 0 : _w.find(item => item.id == pageId);
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
                    if (leadsData && ((_x = leadsData[0]) === null || _x === void 0 ? void 0 : _x._id)) {
                        let newLead = {
                            name: customerName,
                            profileId: customerId,
                            email: "",
                            phone: "",
                            profileUrl: "",
                            interestedPostIds: [...(_y = leadsData[0]) === null || _y === void 0 ? void 0 : _y.interestedPostIds, post_id],
                            interestedProductId: [...(_z = leadsData[0]) === null || _z === void 0 ? void 0 : _z.interestedProductId, ...productsIds],
                            isCustomer: false,
                            orderCount: 0,
                            orderIds: [],
                            address: "",
                            state: "",
                            city: "",
                            source: "facebook"
                        };
                        leads_model_1.default.findByIdAndUpdate((_0 = leadsData[0]) === null || _0 === void 0 ? void 0 : _0._id, newLead, { new: true });
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
            if (entry.messaging && ((_1 = entry.messaging) === null || _1 === void 0 ? void 0 : _1.length)) {
                let messagingData = (_3 = (_2 = req.body) === null || _2 === void 0 ? void 0 : _2.entry[0]) === null || _3 === void 0 ? void 0 : _3.messaging[0];
                const time = messagingData === null || messagingData === void 0 ? void 0 : messagingData.time;
                const senderId = (_4 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.sender) === null || _4 === void 0 ? void 0 : _4.id;
                const recipientId = (_5 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.recipient) === null || _5 === void 0 ? void 0 : _5.id;
                const messageId = (_6 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.message) === null || _6 === void 0 ? void 0 : _6.mid;
                const message = (_7 = messagingData === null || messagingData === void 0 ? void 0 : messagingData.message) === null || _7 === void 0 ? void 0 : _7.text;
                let accountData = yield accounts_model_1.default.find({ profileId: recipientId });
                const userId = (_8 = accountData[0]) === null || _8 === void 0 ? void 0 : _8.userId;
                const username = (_9 = accountData[0]) === null || _9 === void 0 ? void 0 : _9.name;
                //============= check if user is a lead ======================
                let leadsData = yield leads_model_1.default.find({ profileId: senderId });
                let leadName = (_10 = leadsData[0]) === null || _10 === void 0 ? void 0 : _10.name;
                if (leadName) {
                    //============== check for previous messages
                    let oldMessageData = yield message_model_1.default.find({ senderProfileId: senderId });
                    let messageData;
                    if ((_11 = oldMessageData[0]) === null || _11 === void 0 ? void 0 : _11._id) {
                        let oldMessages = (_12 = oldMessageData[0]) === null || _12 === void 0 ? void 0 : _12.messages;
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
                        yield message_model_1.default.findByIdAndUpdate((_13 = oldMessageData[0]) === null || _13 === void 0 ? void 0 : _13._id, messageData, { new: true });
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
