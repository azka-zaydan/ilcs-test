import { StatusCodes } from "http-status-codes";
import redis from "../../../infra/redis";
import Logger from "../../../shared/logger";
import { Task } from "../model";
import {
	createReqToModel,
	createTaskRequest,
	createTaskResult,
	deleteTaskByIDResult,
	getAllTaskResult,
	getTaskByIDResult,
	updateReqToModel,
	updateTaskRequest,
	updateTaskResult,
} from "../model/dto";
import taskRepo from "../repository";

async function getAllTasks(): Promise<getAllTaskResult> {
	let result: getAllTaskResult;
	const cachedTasks = await redis.client().get("tasks");
	if (cachedTasks) {
		const tasks: Task[] = JSON.parse(String(cachedTasks), (key, value) => {
			if (key === "createdAt" || key === "updatedAt" || key === "deletedAt") {
				return new Date(value);
			}
			return value;
		});
		Logger.info("Getting Tasks From Cache");
		result = { tasks };
		return result;
	}

	result = await taskRepo.getAllTasks();
	if (result.failure) {
		Logger.error("failed getting all tasks");
		return result;
	}

	const tasks = JSON.stringify(result.tasks);
	await redis.client().set("tasks", tasks);
	Logger.info("Set Tasks Cache");
	return result;
}

async function createTask(req: createTaskRequest): Promise<createTaskResult> {
	// create the model
	const task = createReqToModel(req);
	// insert to db
	const result = await taskRepo.createTask(task);
	if (result.failure) {
		Logger.error("failed getting creating task");
		return result;
	}
	await redis.client().del("tasks");
	await redis.client().del(`task-${task.id}`);
	Logger.info("Cleared Tasks Cache");
	return { task };
}

async function updateTask(
	req: updateTaskRequest,
	taskId: string
): Promise<updateTaskResult> {
	const existRes = await taskRepo.doesTaskExist(taskId);
	if (existRes.failure) {
		Logger.error("failed checking if task exist");
		return { failure: existRes.failure };
	}

	if (!existRes.exist) {
		Logger.error("task does not exist");
		return {
			failure: {
				code: StatusCodes.NOT_FOUND,
				error: new Error("task does not exist"),
			},
		};
	}
	const task = updateReqToModel(req, taskId);

	const result = await taskRepo.updateTask(task);
	if (result.failure) {
		Logger.error("failed getting updating task");
		return result;
	}
	await redis.client().del("tasks");
	await redis.client().del(`task-${task.id}`);
	Logger.info("Cleared Tasks Cache");
	return { task };
}

async function getTaskByID(taskId: string): Promise<getTaskByIDResult> {
	let result: getTaskByIDResult;
	const cachedTasks = await redis.client().get(`task-${taskId}`);
	if (cachedTasks) {
		const task: Task = JSON.parse(String(cachedTasks), (key, value) => {
			if (key === "createdAt" || key === "updatedAt" || key === "deletedAt") {
				return new Date(value);
			}
			return value;
		});
		Logger.info("Getting Tasks From Cache");
		result = { task };
		return result;
	}
	const existRes = await taskRepo.doesTaskExist(taskId);
	if (existRes.failure) {
		Logger.error("failed checking if task exist");
		return { failure: existRes.failure };
	}
	if (!existRes.exist) {
		Logger.error("task does not exist");
		return {
			failure: {
				code: StatusCodes.NOT_FOUND,
				error: new Error("task does not exist"),
			},
		};
	}
	result = await taskRepo.getTaskByID(taskId);
	if (result.failure) {
		Logger.error("failed getting getting task");
		return result;
	}
	const task = JSON.stringify(result.task);
	await redis.client().set(`task-${taskId}`, task);
	Logger.info("Set Tasks Cache");
	return { task: result.task };
}

async function deleteTaskByID(taskId: string): Promise<deleteTaskByIDResult> {
	const existRes = await taskRepo.doesTaskExist(taskId);
	if (existRes.failure) {
		Logger.error("failed checking if task exist");
		return { failure: existRes.failure };
	}
	const result = await taskRepo.deleteTaskByID(taskId);
	if (result.failure) {
		Logger.error("failed getting deleting task");
		return result;
	}
	await redis.client().del("tasks");
	await redis.client().del(`task-${taskId}`);
	Logger.info("Cleared Tasks Cache");
	return {};
}

const taskService = {
	getAllTasks,
	createTask,
	updateTask,
	getTaskByID,
	deleteTaskByID,
};
export default taskService;
