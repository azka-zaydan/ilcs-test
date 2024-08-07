import OracleConn from "../../../infra/oracle";
import Logger from "../../../shared/logger";
import { Task } from "../model";
import { createTaskResult, getAllTaskResult } from "../model/dto";

async function getAllTasks(): Promise<getAllTaskResult> {
	try {
		const result = await OracleConn.read().execute(getTasksQuery);
		const res = {
			tasks: result.rows?.map(
				(row: any) =>
					({
						taskId: row[0],
						title: row[1],
						description: row[2],
						status: row[3],
						createdAt: row[4],
						createdBy: row[5],
						updatedAt: row[6],
						updatedBy: row[7],
						deletedAt: row[8],
						deletedBy: row[9],
					} as unknown as Task)
			),
		} as getAllTaskResult;
		return res;
	} catch (error) {
		Logger.error("Error executing SELECT query: ", error);
		return {
			error: error instanceof Error ? error : new Error(String(error)),
		};
	}
}

async function createTask(task: Task): Promise<createTaskResult> {
	try {
		const bindParams = {
			taskId: task.id,
			title: task.title,
			description: task.description,
			status: task.status,
			createdAt: task.createdAt || new Date(),
			createdBy: task.createdBy,
			updatedAt: task.updatedAt || new Date(),
			updatedBy: task.updatedBy,
			deletedAt: task.deletedAt || null,
			deletedBy: task.deletedBy || null,
		};
		await OracleConn.write().execute(createTaskQuery, bindParams, {
			autoCommit: true,
		});
		return {
			task,
		};
	} catch (error) {
		return {
			error: error instanceof Error ? error : new Error(String(error)),
		};
	}
}

const getTasksQuery = `SELECT task_id, title, description, status, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by 
FROM task 
WHERE 1=1`;

const createTaskQuery = `
INSERT INTO task (
    task_id, title, description, status, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by
) VALUES (
    :taskId, :title, :description, :status, :createdAt, :createdBy, :updatedAt, :updatedBy, :deletedAt, :deletedBy
)`;

const taskRepo = {
	getAllTasks,
	createTask,
};

export default taskRepo;
