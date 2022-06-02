import { TetralympicDatabaseConfig, DatabaseLogger } from "../database/index.js";

export default class TetralympicTable {
	constructor(options = {}) {
		this.tableName = options.tableName || "No table";
		this.useLogger = options.useLogger || false;
		if (this.useLogger) {
			let loggingLength = options.loggingLength || 40;
			this.logger = new DatabaseLogger({ loggingLength: loggingLength });
		}
		this.connection = TetralympicDatabaseConfig.getConnection();
		this.connection.connect((error) => {
			if (error) {
				if (this.useLogger)
					this.logger.ConnectionFailed("Tetralympic", this.tableName, error);
				else throw error;
			} else {
				if (this.useLogger)
					this.logger.ConnectionEstablished("Tetralympic", this.tableName);
			}
		});
	}

	EndConnection() {
		this.connection.end();
		if (this.useLogger) this.logger.ConnectionEnd();
	}
}
