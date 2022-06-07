import TetralympicTable from "./TetralympicTable.js";
import { TetrioUserInterface } from "../interface/index.js";

export default class TetrioUser extends TetralympicTable {
	constructor(options = {}) {
		options.tableName = "tetrio_user";
		super(options);
	}

	GetUsers() {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT * FROM ${this.tableName}`;
			this.connection.query(queryString, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger) this.logger.QuerySuccess(queryString, result, { length: true });
				result = result.map((r) => new TetrioUserInterface(r));
				resolve(result);
			});
		});
	}

	GetOneUserByName(username) {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT * FROM ${this.tableName} WHERE username = ?`;
			this.connection.query(queryString, username.toLowerCase(), (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger) this.logger.QuerySuccess(queryString, result, { length: true });
				if (result.length !== 0) result[0] = new TetrioUserInterface(result[0]);
				resolve(result);
			});
		});
	}

	GetOneUserById(id) {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT * FROM ${this.tableName} WHERE id = ?`;
			this.connection.query(queryString, id, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger) this.logger.QuerySuccess(queryString, result, { length: true });
				if (result.length !== 0) result[0] = new TetrioUserInterface(result[0]);
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

	PushSnapshot(snapshot) {
		return new Promise((resolve, reject) => {
			let users = snapshot.users;
			users = users.map((u) => {
				return Object.values(u);
			});
			const queryString = `INSERT INTO snapshots_leaderboard (id, username, country, gamesplayed, rating, glicko, rd, \`rank\`, apm, pps, vs, cached_at) VALUES ?`;
			this.connection.query(queryString, [users], (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger)
					this.logger.QuerySuccess(queryString, result, {
						affectedRows: true,
						message: `Snapshot records found: ${users.length}`,
					});
				resolve(result);
			});
		});
	}
}
