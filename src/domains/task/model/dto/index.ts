import { z } from "zod";
import { Task } from "..";
import { Failure } from "../../../../shared/failure";
import { generateV4 } from "../../../../shared/uuid";

export const createTaskRequest = z.object({
	title: z.string(),
	description: z.string().nullable().optional(),
	status: z.enum(["pending", "completed", "in-progress"]),
	createdBy: z.string(),
});

export const updateTaskRequest = z.object({
	title: z.string(),
	description: z.string().nullable().optional(),
	status: z.enum(["pending", "completed", "in-progress"]),
	updatedBy: z.string(),
});

export type createTaskRequest = z.infer<typeof createTaskRequest>;
export type updateTaskRequest = z.infer<typeof updateTaskRequest>;

export function createReqToModel(req: createTaskRequest) {
	const createdTime = new Date();
	const task: Task = {
		id: generateV4(),
		title: req.title,
		description: req.description || null,
		status: req.status,
		createdBy: req.createdBy,
		createdAt: createdTime,
		updatedBy: req.createdBy,
		updatedAt: createdTime,
	};
	return task;
}

export function updateReqToModel(req: updateTaskRequest, taskId: string) {
	const updatedTime = new Date();
	const task: Task = {
		id: taskId,
		title: req.title,
		description: req.description || null,
		status: req.status,
		updatedBy: req.updatedBy,
		updatedAt: updatedTime,
	};
	return task;
}

export type getAllTaskResult = {
	tasks?: Task[];
	failure?: Failure;
};

export type createTaskResult = {
	task?: Task;
	failure?: Failure;
};

export type updateTaskResult = {
	task?: Task;
	failure?: Failure;
};

export type getTaskByIDResult = {
	task?: Task;
	failure?: Failure;
};

export type deleteTaskByIDResult = {
	failure?: Failure;
};
