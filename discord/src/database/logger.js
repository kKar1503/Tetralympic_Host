import Chalk from "chalk";
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export default class DatabaseLogger {
	constructor() {
		this.error = Chalk.bold.blackBright.bgRed;
		this.success = Chalk.bold.blackBright.bgGreen;
		this.warning = Chalk.bold.blackBright.bgYellow;
		this.info = Chalk.blackBright.bgWhiteBright;
	}

	log(message, color, options = {}) {
		const messageLength = message.length;
		if (options.header) {
			let sideLength = 40 - messageLength - 2;
			let leftLength = Math.floor(sideLength / 2);
			let rightLegnth = sideLength % 2 === 0 ? leftLength : leftLength + 1;
			console.log(color(`${"=".repeat(leftLength)} ${message} ${"=".repeat(rightLegnth)}`));
			return;
		}
		if (messageLength < 40) {
			console.log(color(message + " ".repeat(40 - messageLength - 1) + "|"));
			return;
		}
		const size = Math.ceil(message.length / 39);
		const lastLineLength = messageLength - (size - 1) * 39;
		const r = Array(size);
		let offset = 0;

		for (let i = 0; i < size - 1; i++) {
			r[i] = message.substring(offset, offset + 39) + "|";
			offset += 39;
		}
		r[size - 1] =
			message.substring(offset, offset + 39) + " ".repeat(39 - lastLineLength) + "|";
		for (let i = 0; i < size; i++) {
			console.log(color(r[i]));
		}
	}

	connected(database, table, message) {
		let d = new Date();
		this.log(`CONNECTION ESTABLISHED`, this.success, { header: true });
		this.log(
			`Timestamp: ${("0" + d.getDate()).slice(-2)} ${
				MONTHS[d.getMonth() - 1]
			} ${d.getFullYear()}`,
			this.info
		);
		this.log(`Database: ${database || "No info"}`, this.info);
		this.log(`Table: ${table || "No info"}`, this.info);
		this.log(`Message: ${message || "No info"}`, this.info);
		console.log(this.info("=".repeat(40)));
	}

	failed(database, table, error) {
		let d = new Date();
		this.log(`CONNECTION FAILED`, this.error, { header: true });
		this.log(
			`Timestamp: ${("0" + d.getDate()).slice(-2)} ${
				MONTHS[d.getMonth() - 1]
			} ${d.getFullYear()}`,
			this.info
		);
		this.log(`Database: ${database || "No info"}`, this.info);
		this.log(`Table: ${table || "No info"}`, this.info);
		this.log(`Error: ${error || "No info"}`, this.info);
		console.log(this.info("=".repeat(40)));
	}
}

new DatabaseLogger().connected();
new DatabaseLogger().failed();
