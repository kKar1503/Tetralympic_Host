import "dotenv/config";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const { NODE_ENV } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_DIR = path.join(__dirname, "..", "..", "logs");
const LOGFILE_DIR = path.join(LOG_DIR, "httpRequests.log");

let logger;
if (NODE_ENV == "production") {
	if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);
	logger = morgan("common", {
		stream: fs.createWriteStream(LOGFILE_DIR, { flags: "a+" }),
	});
} else {
	logger = morgan("dev");
}

export default logger;
