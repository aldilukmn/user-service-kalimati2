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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const default_response_1 = require("../utils/default-response");
class UserController {
    // public static async getUsers(req: Request, res: Response) {
    //   try {
    //     const users = await UserService.getAllUsers();
    //     res.status(200).json(users);
    //   } catch (error) {
    //     if (error instanceof Error) {
    //       res.status(500).json({
    //         error: error.message
    //       });
    //     };
    //   };
    // };
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const isPict = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            const typePict = (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype;
            const payload = req.body;
            try {
                const newUser = yield user_service_1.UserService.createUser(payload, isPict, typePict);
                const response = (0, default_response_1.defaultResponse)(201, 'success', 'user successfully created', newUser);
                res.status(201).json(response);
            }
            catch (e) {
                if (e instanceof Error) {
                    const response = (0, default_response_1.defaultResponse)(400, 'fail', e.message);
                    res.status(400).json(response);
                }
                ;
            }
            ;
        });
    }
    ;
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            try {
                const result = yield user_service_1.UserService.loginUser(payload);
                const response = (0, default_response_1.defaultResponse)(200, 'success', 'user has found', result);
                res.cookie(`${process.env.COOKIE_NAME}`, `Bearer ${result.token}`, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'none', //with secure is active,
                    path: '/',
                    // domain: 'next-fe-kalimati2.vercel.app'
                }).status(200).json(response);
            }
            catch (e) {
                if (e instanceof Error) {
                    const response = (0, default_response_1.defaultResponse)(400, 'fail', e.message);
                    res.status(400).json(response);
                }
                ;
            }
            ;
        });
    }
    static logoutUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = (0, default_response_1.defaultResponse)(200, 'success', 'user successfully logout');
                res.clearCookie(`${process.env.COOKIE_NAME}`, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'none', //with secure is active,
                    path: '/',
                    // domain: 'next-fe-kalimati2.vercel.app'
                }).status(200).json(response);
            }
            catch (e) {
                if (e instanceof Error) {
                    const response = (0, default_response_1.defaultResponse)(400, 'fail', e.message);
                    res.status(400).json(response);
                }
            }
        });
    }
}
exports.UserController = UserController;
;
