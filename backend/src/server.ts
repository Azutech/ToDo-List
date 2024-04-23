import express, {Application, Request, Response} from 'express'
import { StatusCodes} from 'http-status-codes'
import {config} from 'dotenv';

config()

import { PORT } from './utils/config';

const server : Application = express()

server.use(express.json());
// server.use(helmet());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json(
		{msg : 'Welcome To Transport-Dek 🚀🚀'}
	);
});

server.get('*', (req: Request, res: Response) => {
	res.status(StatusCodes.NOT_FOUND).json({ message: 'route not found 🔎' });
});

server.listen( PORT, () => {
  console.log( `Transport-Dek is listening at http://localhost:${PORT} 🚀🚀`)
})

export default { server }