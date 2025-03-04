"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const upload_file_1 = require("../config/upload-file");
const user_middleware_1 = __importDefault(require("../middleware/user.middleware"));
const router = express_1.default.Router();
// router.get('/', UserController.getUsers);
router.post('/', upload_file_1.handleImage, user_controller_1.UserController.createUser);
router.post('/login', user_controller_1.UserController.loginUser);
router.post('/logout', user_middleware_1.default.verifyToken, user_controller_1.UserController.logoutUser);
exports.default = router;
