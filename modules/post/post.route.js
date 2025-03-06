"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("./post.controller");
const router = express_1.default.Router();
router.post("/create", post_controller_1.createPost);
router.get("/", post_controller_1.getPosts);
router.get("/:id", post_controller_1.getPostById);
router.post("/:id", post_controller_1.updatePost);
router.delete("/:id", post_controller_1.deletePost);
exports.default = router;
