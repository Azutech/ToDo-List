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
exports.updateTask = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const taskClient = new client_1.PrismaClient().task;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.query;
        const { name } = req.body;
        if (typeof taskId !== 'string') {
            throw new Error('Task ID must be a string');
        }
        const taskData = {
            name,
        };
        const task = yield taskClient.update({
            where: {
                id: taskId,
            },
            data: taskData,
        });
        if (!task) {
            throw new Error('Error updating tasks');
        }
        res.status(200).json({ msg: 'Task updated successfully', data: task });
    }
    catch (err) {
        const statusMap = {
            'Error updating tasks': http_status_codes_1.StatusCodes.BAD_GATEWAY,
            'Task ID must be a string': http_status_codes_1.StatusCodes.BAD_GATEWAY,
        };
        const statusCode = statusMap[err.message]
            ? statusMap[err.message]
            : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.updateTask = updateTask;
