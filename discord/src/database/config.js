import "dotenv/config";
import { createConnection } from "mysql";

const dbConnection = {
	getConnection: function () {
		return createConnection({
			host: process.env.DB_HOST || "localhost",
			port: process.env.DB_PORT || 3306,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: "tetralympic",
			multipleStatements: true,
		});
	},
};

export default dbConnection;
