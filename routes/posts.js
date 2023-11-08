import express from "express";
import { createPost, updatePost, deletePost, likePost, getPost, timelinePosts, getUsersPosts } from "../controllers/post.js";

const router = express.Router();

router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id", getPost);
router.get("/timeline/:userId", timelinePosts);
router.get("/profile/:username", getUsersPosts);

export default router;