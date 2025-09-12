"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const morgan_1 = __importDefault(require("morgan"));
const dbConn_1 = __importDefault(require("./config/dbConn"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cors_1 = __importDefault(require("cors"));
const Signup = __importStar(require("./routes/signup"));
const Login = __importStar(require("./routes/login"));
// import passport from "./config/passportLocal"
const passport_1 = __importDefault(require("passport"));
const passportConfig_1 = require("./config/passportConfig");
const auth_1 = __importDefault(require("./middleware/auth"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const credentials_1 = __importDefault(require("./middleware/credentials"));
const useGoogle = __importStar(require("./routes/usegoogle"));
const Logout = __importStar(require("./routes/logout"));
const Beats = __importStar(require("./routes/api/beats"));
const Users = __importStar(require("./routes/api/users"));
(0, passportConfig_1.passportConfig)(passport_1.default);
const PORT = process.env.DB_PORT;
(0, dbConn_1.default)();
//middleware for logging
app.use((0, morgan_1.default)("dev"));
app.use(credentials_1.default);
app.use((0, cors_1.default)(corsOptions_1.default));
// built-in middleware for json
app.use(express_1.default.json());
// built-in middleware to handle urlencoded form data
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: "beatstashsessions",
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({ mongoUrl: process.env.DB_URL }),
}));
//passport middleware
// app.use(passport.initialize())
// app.use(passport.session())
app.use(passport_1.default.authenticate("session"));
app.use("/signup", Signup.router);
app.use("/login", Login.router);
app.use("/logout", Logout.router);
app.use("/auth", useGoogle.router);
app.use("/beats", Beats.router);
app.use("/users", Users.router);
// app.use(isAuthenticated)
app.get("/getdata", auth_1.default, (req, res) => {
    console.log(req.isAuthenticated());
    res.json({ message: "this is ur data" });
});
app.use("/", (req, res) => {
    res.send("Welcome to Beatsash Server");
});
mongoose_1.default.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
mongoose_1.default.connection.on("error", (error) => {
    console.error(error);
    //log error
});
// Post.insertMany(trapPosts);
