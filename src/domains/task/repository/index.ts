import OracleConn from "../../../infra/oracle";
import Logger from "../../../shared/logger";
import { Task } from "../model";

async function getAllTasks(): Promise<Task[] | undefined> {
	try {
		const result = await OracleConn.read().execute(getTasksQuery);
		return result.rows?.map(
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
		);
	} catch (error) {
		Logger.error("Error executing SELECT query: ", error);
		throw error;
	}
}

async function createTask(task: Task) {
	try {
		const bindParams = {
			taskId: task.ID,
			title: task.Title,
			description: task.Description,
			status: task.Status,
			createdAt: task.CreatedAt || new Date(),
			createdBy: task.CreatedBy,
			updatedAt: task.UpdatedAt || new Date(),
			updatedBy: task.UpdatedBy,
			deletedAt: task.DeletedAt || null,
			deletedBy: task.DeletedBy || null,
		};
		await OracleConn.write().execute(createTaskQuery, bindParams, {
			autoCommit: true,
		});
	} catch (error) {}
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
};

export default taskRepo;
