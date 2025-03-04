"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleImage = void 0;
const multer_1 = __importDefault(require("multer"));
const imageStorage = multer_1.default.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
    }
});
exports.handleImage = (0, multer_1.default)({
    storage: imageStorage
}).single('picture_url');
