import TetralympicTable from "./TetralympicTable.js";
import { DiscordUserInterface } from "../interface/index.js";

export default class DiscordUser extends TetralympicTable {
	constructor(options = {}) {
		options.tableName = "discord_user";
		super(options);
	}

	GetUsers() {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT d.*, t.username as tetrioUsername FROM ${this.tableName} as d JOIN tetrio_user as t ON d.fk_tetrio_id = t.id`;
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
			const queryString = `SELECT d.*, t.username as tetrioUsername FROM ${this.tableName} as d JOIN tetrio_user as t ON d.fk_tetrio_id = t.id WHERE d.id = ?`;
			this.connection.query(queryString, id, (error, result) => {
				if (error) {
					console.log(error);
					if (this.useLogger) this.logger.QueryFailed(queryString, error.code);
					return reject(error);
				}
				if (this.useLogger) this.logger.QuerySuccess(queryString, result, { length: true });
				resolve(result);
			});
		});
	}
}
