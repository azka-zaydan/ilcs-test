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

type createTaskRequest = z.infer<typeof createTaskRequest>;

export function createReqToModel(req: createTaskRequest) {
	const createdTime = new Date();
	const task: Task = {
		ID: generateV4(),
		Title: req.title,
		Description: req.description,
		Status: req.status,
		CreatedBy: req.createdBy,
		CreatedAt: createdTime,
		UpdatedBy: req.createdBy,
		UpdatedAt: createdTime,
	};
	return task;
}
