import express from "express";
import Story from "../models/Story.js";
import User from "../models/User.js";

const router = express.Router();

//create
router.post('/', async (req, res) => {
  const newStory = new Story(req.body);
  const user = User.findOne({ _id: req.body.userId });
  try {
    const savedStory = await newStory.save();
    await user.updateOne({ $push: { stories: savedStory } })
    res.status(200).json(savedStory);
  } catch (err) {
    res.status(500).json(err);
  }
})

//delete
router.delete('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (story.userId === req.body.userId) {
      await story.deleteOne();
      res.status(200).json("The story has been deleted");
    } else {
      res.status(403).json("You can delete only your story!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

// User's timeline stories (not current)
router.get('/timelin/:userId', async (req, res) => {
  try {
    const stories = await Story.aggregate([
      {
        $match: {
          createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
        }
      }
    ])
    let userStories = [];
    stories.map(s => {
      if (s.userId === req.params.userId) {
        userStories = [...userStories, s]
      } else { }
    })
    res.status(200).json(userStories);
  } catch (err) {
    res.status(500).json(err);
  }
})

// // timeline home
// router.get('/home/:currentUserId', async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.params.currentUserId);
//     const friendStories = await Promise.all(
//       currentUser.followings?.map((friendId) => {
//         return Story.find({ userId: friendId });
//       })
//     )
   
//     res.status(200).json(friendStories);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })

export default router;