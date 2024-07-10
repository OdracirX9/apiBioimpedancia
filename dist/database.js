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
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectionMySql = void 0;
const mysql2 = __importStar(require("mysql2/promise"));
const config_1 = require("./config/config");
class conectionMySql {
    pool;
    constructor() {
        this.pool = mysql2.createPool({
            host: config_1.keys.mysql.host,
            user: config_1.keys.mysql.user,
            password: config_1.keys.mysql.password,
            port: config_1.keys.mysql.port,
            database: config_1.keys.mysql.database,
            waitForConnections: true,
            connectionLimit: 10, // Máximo 10 conexiones activas a la vez
            queueLimit: 0
        });
    }
    async check() {
        try {
            const connection = await this.pool.getConnection();
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.conectionMySql = conectionMySql;
