

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes} from 'http-status-codes'



const taskClient = new PrismaClient().task;

export const updateTask = async (req, res) => {
    try {
      const {taskId} = req.query;
      const {name} = req.body;
  
      const task = await taskClient.update({
        where: {
          id: taskId,
        },
        data: name,
      });
  

      if (!task  ) {
        throw new Error ('Error updating tasks')
    }
      res.status(200).json({ data: task });
    } catch (err : any) {
        const statusMap: Record<string, number> = {
			'Error updating tasks': StatusCodes.BAD_GATEWAY,
		};

		const statusCode = statusMap[err.message]
			? statusMap[err.message]
			: StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
    }
  };