import express from "express";
import { getConvMessages, newMessage } from "../controllers/message.js";

const router = express.Router();

router.post("/", newMessage);
router.get("/:conversationId", getConvMessages);

export default router;