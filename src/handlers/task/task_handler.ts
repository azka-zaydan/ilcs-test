import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validate } from "uuid";
import {
	createTaskRequest,
	updateTaskRequest,
} from "../../domains/task/model/dto";
import taskService from "../../domains/task/service";
import response from "../../shared/response";

async function createTask(req: Request, res: Response) {
	const result = await taskService.createTask(req.body as createTaskRequest);
	if (result.failure) {
		response.sendWithError(res, result.failure.code, {
			message: result.failure.error.message,
		});
	}
	response.sendWithData(res, StatusCodes.OK, {
		message: "Task created successfully",
		task: result.task,
	});
}

async function getAllTask(req: Request, res: Response) {
	const result = await taskService.getAllTasks();
	if (result.failure) {
		response.sendWithError(res, result.failure.code, {
			message: result.failure.error.message,
		});
	}
	response.sendWithData(res, StatusCodes.OK, result.tasks);
}

async function updateTask(req: Request, res: Response) {
	const taskId = req.params["id"];
	if (!validate(taskId)) {
		response.sendWithError(res, StatusCodes.BAD_REQUEST, {
			message: "Invalid ID Param",
		});
	}
	const result = await taskService.updateTask(
		req.body as updateTaskRequest,
		taskId
	);
	if (result.failure) {
		response.sendWithError(res, result.failure.code, {
			message: result.failure,
		});
	}
	response.sendWithData(res, StatusCodes.OK, {
		message: "Task updated successfully",
		task: result.task,
	});
}

async function getTaskByID(req: Request, res: Response) {
	const taskId = req.params["id"];
	if (!validate(taskId)) {
		response.sendWithError(res, StatusCodes.BAD_REQUEST, {
			message: "Invalid ID Param",
		});
		return;
	}
	const result = await taskService.getTaskByID(taskId);
	if (result.failure) {
		response.sendWithError(res, result.failure.code, {
			message: result.failure.error.message,
		});
		return;
	}
	response.sendWithData(res, StatusCodes.OK, result.task);
}

async function deleteTaskByID(req: Request, res: Response) {
	const taskId = req.params["id"];
	if (!validate(taskId)) {
		response.sendWithError(res, StatusCodes.BAD_REQUEST, {
			message: "Invalid ID Param",
		});
		return;
	}
	const result = await taskService.deleteTaskByID(taskId);
	if (result.failure) {
		response.sendWithError(res, result.failure.code, {
			message: result.failure.error.message,
		});
		return;
	}
	response.sendWithMessage(
		res,
		StatusCodes.NO_CONTENT,
		"Task Deleted Successfully"
	);
}

const taskHandler = {
	createTask,
	getAllTask,
	updateTask,
	getTaskByID,
	deleteTaskByID,
};

export default taskHandler;
