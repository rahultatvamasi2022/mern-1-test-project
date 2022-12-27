import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import database from "./database/index.js";
import auth from "./routes/auth.routes.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

database();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", auth);

app.listen(PORT, () => {
  console.log(`Server listening => ${PORT}`);
});
