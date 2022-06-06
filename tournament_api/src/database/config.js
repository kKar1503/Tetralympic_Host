import "dotenv/config";
import { createConnection } from "mysql2";
const { DB_HOST, DB_PORT, DB_USER, DB_PASS } = process.env;

const dbConnection = {
	getConnection: function () {
		return createConnection({
			host: DB_HOST || "localhost",
			port: DB_PORT || 3306,
			user: DB_USER,
			password: DB_PASS,
			database: "tetralympic",
		});
	},
};

export default dbConnection;
