import oracledb from "oracledb";
import Logger from "../../shared/logger";

let readConn: oracledb.Connection;
let writeConn: oracledb.Connection;

async function getReadConn(): Promise<oracledb.Connection> {
	try {
		const connection = await oracledb.getConnection({
			user: process.env.DB_ORACLE_READ_USER,
			password: process.env.DB_ORACLE_READ_PASSWORD,
			connectionString: process.env.DB_ORACLE_READ_URL,
		});
		Logger.info(
			`Successfully Connected To Oracle Database ${process.env.DB_ORACLE_READ_URL} Read`
		);
		return connection;
	} catch (error) {
		Logger.error("Error connecting to Oracle Database Read: ", error);
		throw error;
	}
}

async function getWriteConn(): Promise<oracledb.Connection> {
	try {
		const connection = await oracledb.getConnection({
			user: process.env.DB_ORACLE_WRITE_USER,
			password: process.env.DB_ORACLE_WRITE_PASSWORD,
			connectionString: process.env.DB_ORACLE_WRITE_URL,
		});
		Logger.info(
			`Successfully Connected To Oracle Database ${process.env.DB_ORACLE_WRITE_URL} Write`
		);
		return connection;
	} catch (error) {
		Logger.error("Error connecting to Oracle Database Write: ", error);
		throw error;
	}
}

export async function setupOracleConn(): Promise<void> {
	readConn = await getReadConn();
	writeConn = await getWriteConn();
}

const OracleConn = {
	read: () => readConn,
	write: () => writeConn,
};

export default OracleConn;
