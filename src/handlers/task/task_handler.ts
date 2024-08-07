import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createTaskRequest } from "../../domains/task/model/dto";
import taskService from "../../domains/task/service";

async function createTask(req: Request, res: Response) {
	const result = await taskService.createTask(req.body as createTaskRequest);
	res.status(StatusCodes.OK).send(result);
}

async function getAllTask(req: Request, res: Response) {
	const result = await taskService.getAllTasks();
	if (result.error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: result.error });
	}
	res.status(StatusCodes.OK).send(result);
}

const taskHandler = {
	createTask,
	getAllTask,
};

export default taskHandler;
