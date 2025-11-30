import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
const app = express();
import morgan from "morgan";

import connectDB from "./config/dbConn";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

import * as Signup from "./routes/signup";
import * as Login from "./routes/login";
// import passport from "./config/passportLocal"
import passport from "passport";
import { passportConfig } from "./config/passportConfig";
import isAuthenticated from "./middleware/auth";
import CorsOptions from "./config/corsOptions";
import credentials from "./middleware/credentials";
import * as useGoogle from "./routes/usegoogle";
import * as Logout from "./routes/logout";
import * as Beats from "./routes/api/beats";
import { trapPosts } from "./services/generateFakeData";
import Post from "./model/Post";
import * as Users from "./routes/api/users";
import credentails from "./middleware/credentials";

passportConfig(passport);

const PORT = process.env.DB_PORT;
connectDB();

//middleware for logging
app.use(morgan("dev"));

app.use(credentials);

app.use(cors(CorsOptions));

// built-in middleware for json
app.use(express.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "beatstashsessions",
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

//passport middleware
// app.use(passport.initialize())
// app.use(passport.session())
app.use(passport.authenticate("session"));

app.use("/signup", Signup.router);

app.use("/login", Login.router);
app.use("/logout", Logout.router);

app.use("/auth", useGoogle.router);

app.use("/beats", Beats.router);

app.use("/users", Users.router);

// app.use(isAuthenticated)
app.get("/getdata", isAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.json({ message: "this is ur data" });
});

app.use("/", (req, res) => {
  res.send("Welcome to Beatsash Server");
});

mongoose.connection.once("open", (): void => {
  console.log("Connected to MongoDB");

  app.listen(PORT, (): void => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (error) => {
  console.error(error);
  //log error
});

// Post.insertMany(trapPosts);
