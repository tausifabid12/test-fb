"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productCarousel_controller_1 = require("./productCarousel.controller");
const router = express_1.default.Router();
router.post("/create", productCarousel_controller_1.createProductCarousel);
router.get("/", productCarousel_controller_1.getProductCarousels);
router.get("/:id", productCarousel_controller_1.getProductCarouselById);
router.post("/:id", productCarousel_controller_1.updateProductCarousel);
router.delete("/:id", productCarousel_controller_1.deleteProductCarousel);
exports.default = router;
