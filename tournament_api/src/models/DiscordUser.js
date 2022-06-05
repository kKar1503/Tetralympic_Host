import TetralympicTable from "./TetralympicTable.js";

export default class DiscordUser extends TetralympicTable {
	constructor(options = {}) {
		options.tableName = "discord_user";
		super(options);
	}

	GetUsers() {
		return new Promise((resolve, reject) => {
			const queryString = `SELECT id, username, discriminator, fk_tetrio_id FROM ${this.tableName}`;
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
			const queryString = `SELECT id, username, rating, \`rank\`, highest_rank FROM ${this.tableName} WHERE id = ?`;
			this.connection.query(queryString, id, (error, result) => {
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
