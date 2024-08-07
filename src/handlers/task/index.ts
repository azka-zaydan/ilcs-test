import { Router } from "express";
import {
	createTaskRequest,
	updateTaskRequest,
} from "../../domains/task/model/dto";
import { validateData } from "../../shared/validator";
import taskHandler from "./task_handler";

const taskRouter = Router();

taskRouter
	.route("/task")
	.get(taskHandler.getAllTask)
	.post(validateData(createTaskRequest), taskHandler.createTask);

taskRouter
	.route("/task/:id")
	.put(validateData(updateTaskRequest), taskHandler.updateTask)
	.get(taskHandler.getTaskByID)
	.delete(taskHandler.deleteTaskByID);

export default taskRouter;
