"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description: 连接mysql
 * @Author: shenxf
 * @Date: 2019-04-09 13:35:37
 */
// 连接MySQL
const mysql_1 = __importDefault(require("mysql"));
const config_1 = __importDefault(require("../common/config/config"));
class Db {
    constructor() {
        this.query = (sql) => __awaiter(this, void 0, void 0, function* () {
            const conn = yield this.getConnection();
            const result = yield this.q(conn, sql);
            return result;
        });
        this.getConnection = () => {
            return new Promise((resolved, rejected) => {
                Db.pool.getConnection((err, connection) => {
                    if (err instanceof Error) {
                        rejected(err);
                    }
                    else {
                        resolved(connection);
                    }
                });
            });
        };
        this.q = (connection, sql) => {
            return new Promise((resolved, rejected) => {
                connection.query(sql, function (err, rows) {
                    if (err instanceof Error) {
                        rejected(err);
                    }
                    else {
                        resolved(rows);
                    }
                    connection.release(); // 释放链接。
                });
            });
        };
    }
}
Db.pool = mysql_1.default.createPool({
    host: config_1.default.host,
    user: config_1.default.user,
    password: config_1.default.password,
    database: config_1.default.database,
    dateStrings: true
});
exports.default = new Db();
