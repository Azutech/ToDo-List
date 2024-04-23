import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const taskClient = new PrismaClient().task;

// getAllTask
export const onetask = async (req: Request, res: Response) => {
	try {
		const { taskId } = req.query;

		if (typeof taskId !== 'string') {
			throw new Error('Task ID must be a string');
		}

		const task = await taskClient.findUnique({
			where: {
				id: taskId,
			},
		});

		if (!task) {
			throw new Error('Error retreiving task');
		}

		res.status(StatusCodes.OK).json({
			msg: 'One task retreived successfully',
			data: task,
		});
	} catch (err: any) {
		console.error(err.message);
		const statusMap: Record<string, number> = {
			'Error retrieving task': StatusCodes.BAD_REQUEST,
		};

		const statusCode = statusMap[err.message]
			? statusMap[err.message]
			: StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
