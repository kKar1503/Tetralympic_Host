import Chalk from "chalk";
import Moment from "moment";

export default class DatabaseLogger {
	constructor(options = {}) {
		this.error = Chalk.bold.blackBright.bgRed;
		this.success = Chalk.bold.blackBright.bgGreen;
		this.warning = Chalk.bold.blackBright.bgYellow;
		this.info = Chalk.blackBright.bgWhiteBright;
		let loggingLength = options.loggingLegnth || 40;
		this.loggingLength = options.loggingLength < 40 ? 40 : options.loggingLength;
		this.displayLength = options.loggingLength < 40 ? 39 : options.loggingLength - 1;
	}

	log(message, color, options = {}) {
		const messageLength = message.length;
		if (options.divider) {
			let sideLength = this.loggingLength - messageLength - 2;
			let leftLength = Math.floor(sideLength / 2);
			let rightLegnth = sideLength % 2 === 0 ? leftLength : leftLength + 1;
			console.log(color(`${"=".repeat(leftLength)} ${message} ${"=".repeat(rightLegnth)}`));
			return;
		}
		if (messageLength < this.loggingLength) {
			console.log(color(message + " ".repeat(this.loggingLength - messageLength - 1) + "|"));
			return;
		}
		const size = Math.ceil(message.length / this.displayLength);
		const lastLineLength = messageLength - (size - 1) * this.displayLength;
		const r = Array(size);
		let offset = 0;

		for (let i = 0; i < size - 1; i++) {
			r[i] = message.substring(offset, offset + this.displayLength) + "|";
			offset += this.displayLength;
		}
		r[size - 1] =
			message.substring(offset, offset + this.displayLength) +
			" ".repeat(this.displayLength - lastLineLength) +
			"|";
		for (let i = 0; i < size; i++) {
			console.log(color(r[i]));
		}
	}

	ConnectionEstablished(database, table, message) {
		let timestamp = Moment().format("DD MMM YYYY, hh:mm:ss a");
		this.log(`CONNECTION ESTABLISHED`, this.success, { divider: true });
		this.log(`Timestamp: ${timestamp}`, this.info);
		this.log(`Database: ${database || "No info"}`, this.info);
		this.log(`Table: ${table || "No info"}`, this.info);
		this.log(`Message: ${message || "No info"}`, this.info);
		console.log(this.info("=".repeat(this.loggingLength)));
	}

	ConnectionEnd() {
		let timestamp = Moment().format("DD MMM YYYY, hh:mm:ss a");
		this.log(`Timestamp: ${timestamp}`, this.success, { divider: true });
		this.log(`CONNECTION CLOSED`, this.success, { divider: true });
	}

	ConnectionFailed(database, table, error) {
		let timestamp = Moment().format("DD MMM YYYY, hh:mm:ss a");
		this.log(`CONNECTION FAILED`, this.error, { divider: true });
		this.log(`Timestamp: ${timestamp}`, this.info);
		this.log(`Database: ${database || "No database."}`, this.info);
		this.log(`Table: ${table || "No table."}`, this.info);
		this.log(`Error: ${error || "No error."}`, this.info);
		console.log(this.error("=".repeat(this.loggingLength)));
	}

	QueryFailed(query, error) {
		let timestamp = Moment().format("DD MMM YYYY, hh:mm:ss a");
		this.log(`QUERY FAILED`, this.error, { divider: true });
		this.log(`Timestamp: ${timestamp}`, this.info);
		this.log(`Query: ${query || "No query"}`, this.info);
		this.log(`Error: ${error || "No error code"}`, this.info);
		console.log(this.error("=".repeat(this.loggingLength)));
	}

	QuerySuccess(query, result, options = {}) {
		let timestamp = Moment().format("DD MMM YYYY, hh:mm:ss a");
		this.log(`QUERY SUCCESS`, this.success, { divider: true });
		this.log(`Timestamp: ${timestamp}`, this.info);
		this.log(`Query: ${query || "No query."}`, this.info);
		if (options.length) this.log(`Length: ${result.length || "No length."}`, this.info);
		if (options.insertId)
			this.log(`Insert ID: ${result.insertId || "No insert ID."}`, this.info);
		if (options.affectedRows)
			this.log(`Affected Rows: ${result.affectedRows || "No affected rows."}`, this.info);
		if (options.changedRows)
			this.log(`Changed Rows: ${result.changedRows || "No changed rows."}`, this.info);
		console.log(this.success("=".repeat(this.loggingLength)));
	}
}
