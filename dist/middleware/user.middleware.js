"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const valid_token_1 = require("../utils/valid-token");
const user_repository_1 = require("../repositories/user.repository");
const default_response_1 = require("../utils/default-response");
class UserMiddleware {
}
_a = UserMiddleware;
UserMiddleware.verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.auth_token;
        const getToken = (0, valid_token_1.validateToken)(token);
        const decoded = jsonwebtoken_1.default.verify(getToken, `${process.env.SECRET_KEY}`);
        const user = yield user_repository_1.UserRepository.findByUsername(decoded.user);
        const isUser = user.username === decoded.user;
        if (!isUser) {
            throw new Error('user not found!');
        }
        next();
    }
    catch (e) {
        if (e instanceof Error) {
            const response = (0, default_response_1.defaultResponse)(401, 'fail', e.message);
            res.status(401).json(response);
        }
        ;
    }
    ;
});
UserMiddleware.isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const getToken = (0, valid_token_1.validateToken)(token);
        const decoded = jsonwebtoken_1.default.verify(getToken, `${process.env.SECRET_KEY}`);
        const user = yield user_repository_1.UserRepository.findByUsername(decoded.user);
        const isAdmin = user.role === decoded.role;
        if (!isAdmin) {
            throw new Error('it\'s not admin!');
        }
        next();
    }
    catch (e) {
        if (e instanceof Error) {
            const response = (0, default_response_1.defaultResponse)(401, 'fail', e.message);
            res.status(401).json(response);
        }
        ;
    }
    ;
});
exports.default = UserMiddleware;
