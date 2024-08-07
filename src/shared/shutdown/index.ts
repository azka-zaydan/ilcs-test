import { Server } from "http";
import OracleConn from "../../infra/oracle";
import redis from "../../infra/redis";
import Logger from "../logger";

// Function to run before shutting down
export async function gracefulShutdown(server: Server) {
	Logger.warn("Running cleanup before shutting down...");
	await OracleConn.read().close();
	await OracleConn.write().close();
	await redis.client().disconnect();
	server.close(() => {
		Logger.warn("Server closed");
		process.exit(0); // Exit the process
	});
}
