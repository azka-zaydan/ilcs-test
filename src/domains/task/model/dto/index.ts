import { z } from "zod";
import { Task } from "..";
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

export type getAllTaskResult = {
	tasks?: Promise<Task[]>;
	error?: Error;
};

export type createTaskResult = {
	task?: Task;
	error?: Error;
};
