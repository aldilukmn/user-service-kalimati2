"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import cookieParser from 'cookie-parser';
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true })); //For Login body json, POST METHOD
dotenv_1.default.config();
// app.use(cookieParser());
app.use((0, cors_1.default)({
    origin: ['https://uptdsdn2kalimati.vercel.app', 'http://localhost:3000'],
    credentials: true,
}));
app.use('/api/users', user_route_1.default);
exports.default = app;
