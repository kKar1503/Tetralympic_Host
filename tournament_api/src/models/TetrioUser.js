import TetralympicTable from "./TetralympicTable.js";

export default class TetrioUser extends TetralympicTable {
	constructor(options = {}) {
		options.tableName = "tetrio_user";
		super(options);
	}

	GetUsers() {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT id, username, rating, \`rank\`, highest_rank FROM ${this.tableName}`;
			this.connection.query(queryString, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger) this.logger.QuerySuccess(queryString, result, { length: true });
				resolve(result);
			});
		});
	}

	InsertOneUser(user) {
		return new Promise((resolve, reject) => {
			const queryString = `INSERT INTO ${this.tableName} SET ?`;
			this.connection.query(queryString, user, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
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
}
