import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import postsRoute from "./routes/posts.js";
import storiesRoute from "./routes/stories.js";
import messagesRoute from "./routes/messages.js";
import conversationsRoute from "./routes/conversations.js";
import commentsRoute from "./routes/comments.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
  }catch(error){
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log('Disconnected from MongoDB');
})

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const port = process.env.port || 8800;

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/conversations", conversationsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/stories", storiesRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, ()=> {
  connect();
  console.log(`Backend server is listening on port ${port}`);
})