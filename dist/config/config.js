"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keys = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.keys = {
    mysql: {
        host: process.env.HOST_MYSQL,
        user: process.env.USER_MYSQL,
        password: process.env.PASS_MYSQL,
        port: parseInt(process.env.PORT_MYSQL || "3306", 10),
        database: process.env.DB_MYSQL,
    }
};
