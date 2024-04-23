"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const config_1 = require("./utils/config");
const task_1 = require("./routes/task");
const server = (0, express_1.default)();
server.use(express_1.default.json());
// server.use(helmet());
server.use(express_1.default.urlencoded({ extended: true }));
server.use('/task', task_1.task);
server.get('/', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'Welcome To Transport-Dek 🚀🚀' });
});
server.get('*', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'route not found 🔎' });
});
server.listen(config_1.PORT, () => {
    console.log(`Transport-Dek is listening at http://localhost:${config_1.PORT} 🚀🚀`);
});
exports.default = { server };
