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
exports.deletePostFromDb = exports.updatePostInDb = exports.getPostByIdFromDb = exports.getPostsFromDb = exports.createPostInDb = void 0;
const post_model_1 = __importDefault(require("./post.model"));
// Create a new Post
const createPostInDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield post_model_1.default.create(data);
});
exports.createPostInDb = createPostInDb;
// Get all Posts
const getPostsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield post_model_1.default.find();
});
exports.getPostsFromDb = getPostsFromDb;
// Get a single Post by ID
const getPostByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield post_model_1.default.findById(id);
});
exports.getPostByIdFromDb = getPostByIdFromDb;
// Update a Post by ID
const updatePostInDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield post_model_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updatePostInDb = updatePostInDb;
// Delete a Post by ID
const deletePostFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield post_model_1.default.findByIdAndDelete(id);
});
exports.deletePostFromDb = deletePostFromDb;
