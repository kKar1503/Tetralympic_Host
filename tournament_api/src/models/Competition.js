import TetralympicTable from "./TetralympicTable.js";
import { CompetitionInterface } from "../interface/index.js";

export default class Competition extends TetralympicTable {
	constructor(options = {}) {
		options.tableName = "competition";
		super(options);
	}

	GetCompetitions() {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT c.*, s.status FROM ${this.tableName} AS c JOIN status AS s ON c.fk_status_id = s.id ORDER BY c.id ASC;`;
			this.connection.query(queryString, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger) this.logger.QuerySuccess(queryString, result, { length: true });
				result = result.map((r) => new CompetitionInterface(r, { status: "number" }));
				resolve(result);
			});
		});
	}

	GetCompetitionById(id) {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT c.*, s.status FROM ${this.tableName} AS c JOIN status AS s ON c.fk_status_id = s.id WHERE c.id = ?;`;
			this.connection.query(queryString, id, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				console.log(result);
				if (this.useLogger) this.logger.QuerySuccess(queryString, result, { length: true });
				resolve(new CompetitionInterface(result[0]));
			});
		});
	}

	DeleteCompetitionById(id) {
		return new Promise((resolve, reject) => {
			const queryString = `DELETE FROM ${this.tableName} WHERE id = ?;`;
			this.connection.query(queryString, id, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				console.log(result);
				if (this.useLogger)
					this.logger.QuerySuccess(queryString, result, { affectedRows: true });
				resolve(result);
			});
		});
	}

	InsertOneCompetition(competition) {
		return new Promise((resolve, reject) => {
			let competitionInsert = [
				competition.name,
				competition.event_date,
				competition.rank_upper_limit,
				competition.rank_lower_limit,
				competition.rd_limit,
				competition.country_limit,
				competition.status,
				competition.registration_deadline,
			];
			const queryString = `INSERT INTO ${this.tableName} (name, event_date, rank_upper_limit, rank_lower_limit, rd_limit, country_limit, fk_status_id, registration_deadline) VALUES ?`;
			this.connection.query(queryString, [[competitionInsert]], (error, result) => {
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
