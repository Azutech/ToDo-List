import express, { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from 'dotenv';
import cors from 'cors'

config();

import { PORT } from './utils/config';
import { task } from './routes/task';

const server: Application = express();

const corsOptions = {
	origin: '*', // Replace with your website's domain or '*' for any origin
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the HTTP methods you want to allow
	credentials: true, // Allow cookies and credentials to be sent with the request
};

server.use(express.json());
// server.use(helmet());

server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));

server.use('/task', task);

server.get('/', (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json({ msg: 'Welcome To Transport-Dek 🚀🚀' });
});

server.get('*', (req: Request, res: Response) => {
	res.status(StatusCodes.NOT_FOUND).json({ message: 'route not found 🔎' });
});

server.listen(PORT, () => {
	console.log(`Transport-Dek is listening at http://localhost:${PORT} 🚀🚀`);
});

export default { server };
