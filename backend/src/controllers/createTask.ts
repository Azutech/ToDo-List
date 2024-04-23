import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes} from 'http-status-codes'



const taskClient = new PrismaClient().task;


export const createAuthor = async (req : Request, res: Response) => {

    const {name} = req.body

    try {
      
      const task = await taskClient.create({
        data: name,
      });

      if (!task) {
        throw new Error ('Can not create task ')
      }
  
      res.status(StatusCodes.CREATED).json({ data: task });
    } catch (err: any) {
        console.error(err);
		const statusMap: Record<string, number> = {
			'Can not create task ': StatusCodes.CONFLICT,
		};

		const statusCode = statusMap[err.message]
			? statusMap[err.message]
			: StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
    }
  };
  