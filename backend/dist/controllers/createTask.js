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
exports.createTask = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const taskClient = new client_1.PrismaClient().task;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const taskData = {
            name,
        };
        const task = yield taskClient.create({
            data: taskData,
        });
        if (!task) {
            throw new Error('Can not create task ');
        }
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            msg: 'Task created successfully',
            data: task,
        });
    }
    catch (err) {
        console.error(err);
        const statusMap = {
            'Can not create task ': http_status_codes_1.StatusCodes.BAD_REQUEST,
        };
        const statusCode = statusMap[err.message]
            ? statusMap[err.message]
            : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.createTask = createTask;
