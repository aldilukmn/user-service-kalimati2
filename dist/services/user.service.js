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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const handle_cloudinary_1 = require("../utils/handle-cloudinary");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    // public static async getAllUsers() {
    //   return await prisma.user.findMany();
    // };
    static createUser(data, isPict, typePict) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, email, role, picture_url, picture_id } = data;
            if (!username || !password || !email) {
                throw new Error(`please enter ${!username ? 'username' : !password ? 'password' : !email ? 'email' : null}`);
            }
            ;
            if (password.length < 8) {
                throw new Error('password length should be more than 8 characters');
            }
            ;
            if (!email.includes('@')) {
                throw new Error('not email format');
            }
            ;
            if (typePict !== 'image/png' &&
                typePict !== 'image/jpg' &&
                typePict !== 'image/jpeg') {
                throw new Error('it\'s not image format');
            }
            ;
            const existingUser = yield user_repository_1.UserRepository.findByUsername(username);
            if (existingUser) {
                throw new Error('username already exists');
            }
            ;
            const getPict = yield (0, handle_cloudinary_1.handleCloudinary)(isPict, 'user');
            const salt = yield bcrypt_1.default.genSalt();
            const hashing = yield bcrypt_1.default.hash(password, salt);
            return yield user_repository_1.UserRepository.create({
                username,
                password: hashing,
                email,
                role: 'admin',
                picture_url: getPict.secure_url,
                picture_id: getPict.public_id,
            });
        });
    }
    ;
    static loginUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const username = (_a = payload.username) === null || _a === void 0 ? void 0 : _a.trim();
                const password = (_b = payload.password) === null || _b === void 0 ? void 0 : _b.trim();
                if (!username || !password || username.length === 0 || password.length === 0) {
                    throw new Error(`${!username ? 'username' : 'password'} is required`);
                }
                const getUser = yield user_repository_1.UserRepository.findByUsername(username);
                if (!getUser || !getUser.username) {
                    throw new Error('username doesn\'t exist');
                }
                const passIsCorrect = yield bcrypt_1.default.compare(password, getUser.password);
                if (!passIsCorrect) {
                    throw new Error('wrong password');
                }
                ;
                if (!process.env.SECRET_KEY) {
                    throw new Error('secret key is not defined in the environment variable');
                }
                ;
                const token = jsonwebtoken_1.default.sign({
                    user: username,
                    role: getUser.role
                }, process.env.SECRET_KEY, {
                    expiresIn: '1h'
                });
                return {
                    token,
                    username
                };
            }
            catch (e) {
                if (e instanceof Error)
                    throw new Error(e.message);
                throw new Error('an unknow error occured during login');
            }
            ;
        });
    }
    ;
}
exports.UserService = UserService;
;
