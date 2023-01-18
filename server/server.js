import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import { v4 } from "uuid";

import database from "./database/index.js";
import auth from "./routes/auth.routes.js";
import conversation from "./routes/conversation.routes.js";
import message from "./routes/message.routes.js";
import user from "./routes/user.routes.js";
// import sessionsModel from "./models/session.model.js";

dotenv.config();

const MongoDBStore = connectMongoDBSession(session);

database();

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  expires: 1000 * 60 * 60 * 24,
  idField: "token",
});

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
// app.use(cookieParser());
app.use(
  session({
    name: "token",
    secret: process.env.SESSION_TOKEN || "Shsh!Secret!",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
      path: "/",
    },
    store: store,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", auth);
app.use("/api", conversation);
app.use("/api", message);
app.use("/api", user);

// socket
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

// const

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log(users);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    // console.log(user);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("join_conversation", ({ senderId, conversationId }) => {
    const user = getUser(senderId);
    socket.join(conversationId);

    socket.broadcast
      .to(conversationId)
      .emit("user_joined", { user, conversationId });
  });

  socket.on("groupMessage", ({ senderId, conversationId, text }) => {
    // const user = getUser(senderId);

    socket.broadcast.to(conversationId).emit("get_groupMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening => http://localhost:${PORT}`);
});
