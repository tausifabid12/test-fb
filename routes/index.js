"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const category_route_1 = __importDefault(require("../modules/category/category.route"));
const product_route_1 = __importDefault(require("../modules/product/product.route"));
const endpoint_route_1 = __importDefault(require("../modules/endpoint/endpoint.route"));
const router = express_1.default.Router();
router.use("/user", user_route_1.default);
router.use("/category", category_route_1.default);
router.use("/product", product_route_1.default);
router.use("/endpoint", endpoint_route_1.default);
exports.default = router;
