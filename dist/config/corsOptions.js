"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins_1 = __importDefault(require("./allowedOrigins"));
const CorsOptions = {
    origin: (origin, callback) => {
        if (origin !== undefined) {
            if (allowedOrigins_1.default.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        }
        else {
            // callback(new Error("Not allowed by CORS")); //do not allow if theres no origin
            callback(null, true);
        }
    },
    credentials: true,
    // optionsSuccessStatus: 200,
};
exports.default = CorsOptions;
