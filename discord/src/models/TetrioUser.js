import { TetralympicDatabaseConfig, DatabaseLogger } from "../database/index.js";

export default class TetrioUser {
	constructor(options = {}) {
		this.useLogger = options.useLogger || false;
		if (this.useLogger) {
			let loggingLength = options.loggingLength || 40;
			this.logger = new DatabaseLogger({ loggingLength: loggingLength });
		}
		this.connection = TetralympicDatabaseConfig.getConnection();
		this.connection.connect((error) => {
			if (error) {
				if (this.useLogger)
					this.logger.ConnectionFailed("Tetralympic", "tetrio_user", error);
				else throw error;
			} else {
				if (this.useLogger) this.logger.ConnectionEstablished("Tetralympic", "tetrio_user");
			}
		});
	}

	GetUsers() {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT id, username, rating, \`rank\`, highest_rank FROM tetrio_user`;
			this.connection.query(queryString, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed("Tetralympic", error.code);
					return reject(error);
				}
				if (this.useLogger) this.logger.QuerySuccess(queryString, result, { length: true });
				resolve(result);
			});
		});
	}

	InsertOneUser(tetrioUser) {
		return new Promise((resolve, reject) => {
			const queryString = `INSERT INTO tetrio_user SET ?`;
			this.connection.query(queryString, tetrioUser, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed("Tetralympic", error.code);
					return reject(error);
				}
				if (this.useLogger)
					this.logger.QuerySuccess(queryString, result, {
						affectedRows: true,
					});
				resolve(result);
			});
		});
	}

	EndConnection() {
		this.connection.end();
		if (this.useLogger) this.logger.ConnectionEnd();
	}
}
