import express from "express";
import { getTwoUserConv, newConv, userConvs } from "../controllers/conversation.js";

const router = express.Router();

router.post("/", newConv)
router.get("/:userId", userConvs);
router.get("/find/:firstUserId/:secondUserId", getTwoUserConv);

export default router;