import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const taskClient = new PrismaClient().task;

export const updateTask = async (req: Request, res: Response) => {
	try {
		const { taskId } = req.query;
		const { name } = req.body;

		if (typeof taskId !== 'string') {
			throw new Error('Task ID must be a string');
		}

		const taskData = {
			name,
		};

		const task = await taskClient.update({
			where: {
				id: taskId,
			},
			data: taskData,
		});

		if (!task) {
			throw new Error('Error updating tasks');
		}
		res.status(200).json({ msg: 'Task updated successfully', data: task });
	} catch (err: any) {
		const statusMap: Record<string, number> = {
			'Error updating tasks': StatusCodes.BAD_GATEWAY,
			'Task ID must be a string': StatusCodes.BAD_GATEWAY,
		};

		const statusCode = statusMap[err.message]
			? statusMap[err.message]
			: StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
