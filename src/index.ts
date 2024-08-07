import "dotenv/config";
import express from "express";
import setupInfras from "./infra";
import Logger from "./shared/logger";
import { gracefulShutdown } from "./shared/shutdown";
import { serveHTTP } from "./transport/http/router";

const app = express();
function main() {
	setupInfras();
	const server = serveHTTP(app);
	// Listen for SIGINT (Ctrl+C)
	process.on("SIGINT", () => {
		Logger.warn("SIGINT signal received");
		gracefulShutdown(server);
	});

	// Listen for SIGTERM (e.g., from a process manager)
	process.on("SIGTERM", () => {
		Logger.warn("SIGTERM signal received");
		gracefulShutdown(server);
	});
}

main();

export default app;
