import bodyParser from "body-parser";
import { Express } from "express";
import Logger from "../../shared/logger";
import morganMiddleware from "./middleware";
import { setupRoutes } from "./routes";
export function serveHTTP(app: Express) {
	const port = process.env.SERVER_PORT;
	app.use(bodyParser.json());
	app.use(morganMiddleware);

	setupRoutes(app);
	return app.listen(port, () => {
		Logger.info(`running on port: ${port}`);
	});
}
