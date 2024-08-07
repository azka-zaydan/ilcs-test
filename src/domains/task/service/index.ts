import taskRepo from "../repository";

async function getAllTasks() {
	const result = await taskRepo.getAllTasks();
	if (!result) {
		return;
	}
	return result;
}

function createTask(reqBody: any) {}

const taskService = {
	getAllTasks,
	createTask,
};
export default taskService;
