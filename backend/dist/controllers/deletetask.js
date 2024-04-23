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
exports.deleteTask = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const taskClient = new client_1.PrismaClient().task;
// getAllTask
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.query;
        if (typeof taskId !== 'string') {
            throw new Error('Task ID must be a string');
        }
        const task = yield taskClient.delete({
            where: {
                id: taskId,
            },
        });
        if (!task) {
            throw new Error('Error delete tasks');
        }
        return res
            .status(http_status_codes_1.StatusCodes.NO_CONTENT)
            .json({ msg: 'Task deleted successfully', data: task });
    }
    catch (err) {
        console.error(err.message);
        const statusMap = {
            'Error retrieving tasks': http_status_codes_1.StatusCodes.BAD_REQUEST,
        };
        const statusCode = statusMap[err.message]
            ? statusMap[err.message]
            : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
});
exports.deleteTask = deleteTask;
