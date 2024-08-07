import { Router } from "express";
import { createTaskRequest } from "../../domains/task/model/dto";
import { validateData } from "../../shared/validator";
import taskHandler from "./task_handler";

const taskRouter = Router();

taskRouter
	.route("/task")
	.get(taskHandler.getAllTask)
	.post(validateData(createTaskRequest), taskHandler.createTask);

export default taskRouter;
