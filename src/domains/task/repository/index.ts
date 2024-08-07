import { StatusCodes } from "http-status-codes";
import OracleConn from "../../../infra/oracle";
import { Failure, RepoError } from "../../../shared/failure";
import Logger from "../../../shared/logger";
import { Task } from "../model";
import { getAllTaskResult, getTaskByIDResult } from "../model/dto";

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
		Logger.error(`Error From DB: ${error}`);
		return {
			failure: {
				error: error instanceof Error ? error : new Error(String(error)),
				code: StatusCodes.INTERNAL_SERVER_ERROR,
			},
		};
	}
}

async function createTask(task: Task): RepoError {
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
		return {};
	} catch (error) {
		Logger.error(`Error From DB: ${error}`);
		return {
			failure: {
				error: error instanceof Error ? error : new Error(String(error)),
				code: StatusCodes.INTERNAL_SERVER_ERROR,
			},
		};
	}
}

async function updateTask(task: Task): RepoError {
	try {
		const bindParams = {
			taskId: task.id,
			title: task.title,
			description: task.description,
			status: task.status,
			updatedAt: new Date(),
			updatedBy: task.updatedBy,
			deletedAt: task.deletedAt,
			deletedBy: task.deletedBy,
		};
		await OracleConn.write().execute(updateTaskQuery, bindParams, {
			autoCommit: true,
		});
		return {};
	} catch (error) {
		Logger.error(`Error From DB: ${error}`);
		return {
			failure: {
				error: error instanceof Error ? error : new Error(String(error)),
				code: StatusCodes.INTERNAL_SERVER_ERROR,
			},
		};
	}
}

async function doesTaskExist(
	taskId: string
): Promise<{ exist: boolean; failure?: Failure }> {
	const bindParams = {
		taskId,
	};

	try {
		const result = await OracleConn.read().execute(
			doesTaskExistQuery,
			bindParams
		);
		const count = Number(result.rows?.length);
		return { exist: count > 0 };
	} catch (error) {
		return {
			exist: false,
			failure: {
				error: error instanceof Error ? error : new Error(String(error)),
				code: StatusCodes.INTERNAL_SERVER_ERROR,
			},
		};
	}
}

async function getTaskByID(taskId: string): Promise<getTaskByIDResult> {
	try {
		const bindParams = {
			taskId,
		};
		const result = await OracleConn.read().execute(taskByIdQuery, bindParams);
		if (!result.rows) {
			return {};
		}
		const row: any = result.rows[0];
		const task: Task = {
			id: row[0],
			title: row[1],
			description: row[2],
			status: row[3],
			createdAt: row[4],
			createdBy: row[5],
			updatedAt: row[6],
			updatedBy: row[7],
			deletedAt: row[8],
			deletedBy: row[9],
		};
		return { task };
	} catch (error) {
		Logger.error(`Error From DB: ${error}`);
		return {
			failure: {
				error: error instanceof Error ? error : new Error(String(error)),
				code: StatusCodes.INTERNAL_SERVER_ERROR,
			},
		};
	}
}

async function deleteTaskByID(taskId: string): RepoError {
	try {
		const bindParams = {
			taskId,
		};
		await OracleConn.write().execute(deleteTaskquery, bindParams, {
			autoCommit: true,
		});
		return {};
	} catch (error) {
		Logger.error(`Error From DB: ${error}`);
		return {
			failure: {
				error: error instanceof Error ? error : new Error(String(error)),
				code: StatusCodes.INTERNAL_SERVER_ERROR,
			},
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

const updateTaskQuery = `
UPDATE task
	SET 
		title = :title,
		description = COALESCE(:description, description),
		status = :status,
		updated_at = :updatedAt,
		updated_by = :updatedBy,
		deleted_at = :deletedAt,
		deleted_by = :deletedBy
	WHERE task_id = :taskId
`;

const doesTaskExistQuery = `
        SELECT 1
        FROM task
        WHERE task_id = :taskId
    `;

const deleteTaskquery = `
	DELETE FROM task
	WHERE task_id = :taskId
`;
const taskByIdQuery = getTasksQuery + " AND task_id = :taskId";
const taskRepo = {
	getAllTasks,
	createTask,
	updateTask,
	doesTaskExist,
	getTaskByID,
	deleteTaskByID,
};

export default taskRepo;
