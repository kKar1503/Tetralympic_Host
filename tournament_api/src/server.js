import "dotenv/config";
import { ActivityLog } from "../../logs/Logger.js";
import express from "express";
import router from "./routes/index.js";
import Chalk from "chalk";
const { HOSTNAME, PORT } = process.env;

const port = PORT || 3000;
const hostname = HOSTNAME;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use((req, res) => {
	res.on("finish", () => ActivityLog(0, `${req.method} ${req.url} [${res.statusCode}]`));
});
app.listen(port, hostname, () => {
	console.log(Chalk.bold.blackBright.bgGreen(`${"=".repeat(13)} API Started ${"=".repeat(14)}`));
	console.log(Chalk.bold.blackBright.bgGreen(`Listening on https://${hostname}:${port}/    `));
	console.log(Chalk.bold.blackBright.bgGreen(`${"=".repeat(40)}`));
});
