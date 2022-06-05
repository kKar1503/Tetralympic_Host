import "dotenv/config";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const { NODE_ENV } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_DIR = path.join(__dirname, "..", "..", "logs", "httpRequests.log");

let logger;
if (NODE_ENV == "production") {
	logger = morgan("common", {
		stream: fs.createWriteStream(LOG_DIR, { flags: "a" }),
	});
} else {
	logger = morgan("dev");
}

export default logger;
