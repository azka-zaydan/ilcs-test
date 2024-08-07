import Logger from "../../../shared/logger";
import { createReqToModel, createTaskRequest } from "../model/dto";
import taskRepo from "../repository";

async function getAllTasks() {
	const result = await taskRepo.getAllTasks();
	if (!result.tasks || result.error) {
		Logger.error("failed getting all tasks");
		return result;
	}
	return result;
}

async function createTask(req: createTaskRequest) {
	// create the model
	const task = createReqToModel(req);
	const result = await taskRepo.createTask(task);
	if (!result.task || result.error) {
		Logger.error("failed getting creating task");
		return result;
	}
	return result;
}

const taskService = {
	getAllTasks,
	createTask,
};
export default taskService;
