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
exports.router = void 0;
const express_1 = require("express");
const BeatsController = __importStar(require("../controllers/beatsController"));
const multer_1 = __importDefault(require("multer"));
const filesExists_1 = __importDefault(require("../middleware/filesExists"));
const mp3fileValidator_1 = __importDefault(require("../middleware/mp3fileValidator"));
const artworkValidator_1 = __importDefault(require("../middleware/artworkValidator"));
const wavfileValidator_1 = __importDefault(require("../middleware/wavfileValidator"));
const auth_1 = __importDefault(require("../middleware/auth"));
const maxFileSizeMB = 100000000;
const router = (0, express_1.Router)();
exports.router = router;
// const upload = multer({
//   fileFilter: (req, file, cb) => {
//     console.log(file);
//     cb(null, true);
//   },
// });
const upload = (0, multer_1.default)();
router
    .route("/")
    .get(BeatsController.getAllBeats)
    .post(auth_1.default, upload.fields([
    { name: "artwork", maxCount: 1 },
    { name: "mp3", maxCount: 1 },
    { name: "wav", maxCount: 1 },
]), filesExists_1.default, artworkValidator_1.default, mp3fileValidator_1.default, wavfileValidator_1.default, BeatsController.AddNewBeat);
