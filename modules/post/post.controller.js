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
exports.deletePost = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const post_service_1 = require("./post.service");
// Create a new Post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Post = yield (0, post_service_1.createPostInDb)(req.body);
        res.status(201).json(Post);
    }
    catch (error) {
        res.status(400).json({ message: "Error creating ", error });
    }
});
exports.createPost = createPost;
// Get all Posts
const getPosts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Posts = yield (0, post_service_1.getPostsFromDb)();
        res.json(Posts);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching s", error });
    }
});
exports.getPosts = getPosts;
// Get a single Post by ID
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Post = yield (0, post_service_1.getPostByIdFromDb)(req.params.id);
        if (!Post) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Post);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching ", error });
    }
});
exports.getPostById = getPostById;
// Update a Post by ID
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Post = yield (0, post_service_1.updatePostInDb)(req.params.id, req.body);
        if (!Post) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json(Post);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating ", error });
    }
});
exports.updatePost = updatePost;
// Delete a Post by ID
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Post = yield (0, post_service_1.deletePostFromDb)(req.params.id);
        if (!Post) {
            res.status(404).json({ message: "User flow not found" });
            return;
        }
        res.json({ message: "User flow deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting ", error });
    }
});
exports.deletePost = deletePost;
