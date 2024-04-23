import { Router } from 'express';
import {
	createTask,
	onetask,
	deleteTask,
	updateTask,
	alltask,
} from '../controllers';

export const task: Router = Router();

task.post('/createTask', createTask);
task.get('/onetask', onetask);
task.delete('/deleteTask', deleteTask);
task.put('/updateTask', updateTask);
task.get('/alltask', alltask);
