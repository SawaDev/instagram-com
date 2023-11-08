import express from 'express';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const newComment = new Comment(req.body);
  const post = Post.findOne({ _id: req.body.postId })
  try {
    const savedComment = await newComment.save();
    await post.updateOne({ $push: { comments: savedComment } })
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(404).json(err);
  }
})

router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
  }
})

export default router;