import express from "express";
import User from "../models/User.js";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

export default router