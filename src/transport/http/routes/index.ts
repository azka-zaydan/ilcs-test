import { Express } from "express";
import taskRouter from "../../../handlers/task";

export function setupRoutes(app: Express) {
	app.use("/v1", taskRouter);
}
