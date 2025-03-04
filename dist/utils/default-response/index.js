"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultResponse = void 0;
const defaultResponse = (code, response, message, result) => {
    return {
        status: {
            code,
            response,
            message,
        },
        result
    };
};
exports.defaultResponse = defaultResponse;
