import TetralympicTable from "./TetralympicTable.js";
import { DiscordUserInterface } from "../interface/index.js";

export default class DiscordUser extends TetralympicTable {
	constructor(options = {}) {
		options.tableName = "discord_user";
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
				result = result.map((r) => new DiscordUserInterface(r));
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

	BindTetrio(discordId, tetrioId) {
		return new Promise((resolve, reject) => {
			const queryString = `UPDATE ${this.tableName} SET fk_tetrio_id = ? WHERE id = ?`;
			this.connection.query(queryString, [tetrioId, discordId], (error, result) => {
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

	GetOneUserByID(id) {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT * FROM ${this.tableName} WHERE id = ?`;
			this.connection.query(queryString, id, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger) this.logger.QuerySuccess(queryString, result, { length: true });
				if (result.length !== 0) result[0] = new DiscordUserInterface(result[0]);
				resolve(result);
			});
		});
	}

	GetOneUserByTetrio(tetrioId) {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT * FROM ${this.tableName} WHERE fk_tetrio_id = ?`;
			this.connection.query(queryString, tetrioId, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger) this.logger.QuerySuccess(queryString, result, { length: true });
				if (result.length !== 0) result[0] = new DiscordUserInterface(result[0]);
				resolve(result);
			});
		});
	}

	GetTetrioByID(discordId) {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT *, t.username FROM ${this.tableName} AS d JOIN tetrio_user AS t ON t.id = d.fk_tetrio_id WHERE d.id = ?`;
			this.connection.query(queryString, discordId, (error, result) => {
				if (error) {
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger) this.logger.QuerySuccess(queryString, result, { length: true });
				resolve(result);
			});
		});
	}
}
