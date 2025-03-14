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
exports.getPages = getPages;
exports.getPagesToken = getPagesToken;
exports.replyToComment = replyToComment;
exports.checkProductStock = checkProductStock;
const product_model_1 = __importDefault(require("../product/product.model"));
function getPages(accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://graph.facebook.com/v9.0/me/accounts?access_token=${accessToken}`);
        if (!res.ok) {
            throw new Error(`Error fetching pages: ${res.statusText}`);
        }
        const result = yield res.json();
        if (!result.data || !Array.isArray(result.data)) {
            throw new Error("Invalid response format");
        }
        return result.data.map((page) => ({
            access_token: page.access_token || "",
            category: page.category || "",
            category_list: page.category_list || [],
            name: page.name || "",
            id: page.id || "",
            tasks: page.tasks || []
        }));
    });
}
function getPagesToken(accessToken, pageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://graph.facebook.com/${pageId}?fields=access_token&access_token=${accessToken}`);
        if (!res.ok) {
            throw new Error(`Error fetching pages: ${res.statusText}`);
        }
        const result = yield res.json();
        if (!result) {
            throw new Error("Invalid response format");
        }
        return {
            access_token: result.access_token || "",
            id: result.id || "",
        };
    });
}
function replyToComment(pageAccessToken, commentId, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://graph.facebook.com/v22.0/${commentId}/comments?access_token=${pageAccessToken}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });
        // if (!res.ok) {
        //     throw new Error(`Error replying to comment: ${res.statusText}`);
        // }
        const result = yield res.json();
        console.log(result, '|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
        if (!result || !result.id) {
            throw new Error("Invalid response format");
        }
        return { id: result.id };
    });
}
// ============================= check product stock
function checkProductStock(productIds) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_model_1.default.findOne({
            _id: { $in: productIds },
            stock: { $gt: 0 }
        });
        return product !== null;
    });
}
