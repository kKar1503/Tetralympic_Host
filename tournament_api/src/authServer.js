import "dotenv/config";
import { ActivityLog } from "../../logs/Logger.js";
import express from "express";
import Chalk from "chalk";
import jwt from "jsonwebtoken";
const { HOSTNAME, AUTH_PORT, SECRET_KEY } = process.env;

const port = AUTH_PORT || 4000;
const hostname = HOSTNAME;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res) => {
	res.on("finish", () => ActivityLog(1, `${req.method} ${req.url} [${res.statusCode}]`));
});

app.post("/", (req, res) => {
	let getTetrioUsers =
		typeof req.body.getTetrioUsers === "boolean" ? req.body.getTetrioUsers : false;
	let getDiscordUser =
		typeof req.body.getDiscordUser === "boolean" ? req.body.getDiscordUser : false;
	let pushSnapshots =
		typeof req.body.pushSnapshots === "boolean" ? req.body.pushSnapshots : false;
	let accessToken = jwt.sign(
		{
			getTetrioUsers: getTetrioUsers,
			getDiscordUser: getDiscordUser,
			pushSnapshots: pushSnapshots,
		},
		SECRET_KEY
	);
	res.json(accessToken);
});

app.listen(port, hostname, () => {
	console.log(Chalk.bold.blackBright.bgGreen(`${"=".repeat(13)} API Started ${"=".repeat(14)}`));
	console.log(Chalk.bold.blackBright.bgGreen(`Listening on https://${hostname}:${port}/    `));
	console.log(Chalk.bold.blackBright.bgGreen(`${"=".repeat(40)}`));
});
