import TetralympicTable from "./TetralympicTable.js";
import { CompetitionInterface } from "../interface/index.js";

export default class Competition extends TetralympicTable {
	constructor(options = {}) {
		options.tableName = "competition";
		super(options);
	}

	GetCompetitions() {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT * FROM ${this.tableName}`;
			this.connection.query(queryString, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger) this.logger.QuerySuccess(queryString, result, { length: true });
				result.map((r) => new CompetitionInterface(r));
				resolve(result);
			});
		});
	}

	GetCompetitionById(id) {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT * FROM ${this.tableName} WHERE id = ?`;
			this.connection.query(queryString, id, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger) this.logger.QuerySuccess(queryString, result, { length: true });
				resolve(new CompetitionInterface(result[0]));
			});
		});
	}

	InsertOneCompetition(competition) {
		return new Promise((resolve, reject) => {
			const queryString = `INSERT INTO ${this.tableName} SET ?`;
			this.connection.query(
				queryString,
				new CompetitionInterface(competition),
				(error, result) => {
					if (error) {
						if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
						return reject(error);
					}
					if (this.useLogger)
						this.logger.QuerySuccess(queryString, result, {
							affectedRows: true,
						});
					resolve(result);
				}
			);
		});
	}
}
