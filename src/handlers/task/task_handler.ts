import { Request, Response } from "express";
import taskService from "../../domains/task/service";

async function createTask(req: Request, res: Response) {
	res.status(200).send({ message: "ok" });
}

async function getAllTask(req: Request, res: Response) {
	const result = await taskService.getAllTasks();
	res.status(200).send(result);
}

const taskHandler = {
	createTask,
	getAllTask,
};

export default taskHandler;
