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
			multipleStatements: true,
			authSwitchHandler: function ({ pluginName, pluginData }, cb) {
				if (pluginName === "ssh-key-auth") {
					getPrivateKey((key) => {
						const response = encrypt(key, pluginData);
						// continue handshake by sending response data
						// respond with error to propagate error to connect/changeUser handlers
						cb(null, response);
					});
				} else {
					const err = new Error(`Unknown AuthSwitchRequest plugin name ${pluginName}`);
					err.fatal = true;
					cb(err);
				}
			},
		});
	},
};

export default dbConnection;
