import { setupOracleConn } from "./oracle";
import { setupRedisConn } from "./redis";

export default async function setupInfras() {
	await setupOracleConn();
	await setupRedisConn();
}
