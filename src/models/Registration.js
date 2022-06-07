import TetralympicTable from "./TetralympicTable.js";

export default class Registration extends TetralympicTable {
	constructor(options = {}) {
		options.tableName = "tetrio_users_competitions";
		super(options);
	}

	RegistrationCountByCompetitionId(id) {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT COUNT ( * ) as "NumRegister" FROM ${this.tableName} WHERE fk_competition_id = ?`;
			this.connection.query(queryString, id, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger)
					this.logger.QuerySuccess(queryString, result, {
						message: `${result[0].NumRegister} registered for competition of id ${id}`,
					});
				resolve(result);
			});
		});
	}

	CheckRegistration(tetrioId, compId) {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT * FROM ${this.tableName} WHERE fk_tetrio_id = ? AND fk_competition_id = ?`;
			this.connection.query(queryString, [tetrioId, compId], (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger) this.logger.QuerySuccess(queryString, result, { length: true });
				resolve(result);
			});
		});
	}

	Register(tetrioId, compId) {
		return new Promise((resolve, reject) => {
			const queryString = `INSERT INTO ${this.tableName} (fk_tetrio_id, fk_competition_id) VALUES (?, ?)`;
			this.connection.query(queryString, [tetrioId, compId], (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger)
					this.logger.QuerySuccess(queryString, result, { affectedRows: true });
				resolve(result);
			});
		});
	}

	Unregister(tetrioId, compId) {
		return new Promise((resolve, reject) => {
			const queryString = `DELETE FROM ${this.tableName} WHERE fk_tetrio_id = ? AND fk_competition_id = ?`;
			this.connection.query(queryString, [tetrioId, compId], (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger)
					this.logger.QuerySuccess(queryString, result, { affectedRows: true });
				resolve(result);
			});
		});
	}
}
