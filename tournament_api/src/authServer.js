import "dotenv/config";
import express from "express";
import Chalk from "chalk";
import jwt from "jsonwebtoken";
import { httpLogger } from "./middlewares/index.js";
const { HOSTNAME, AUTH_PORT, SECRET_KEY } = process.env;

const port = AUTH_PORT || 4000;
const hostname = HOSTNAME;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(httpLogger);

app.get("/", (req, res) => {
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
	res.json({ accessToken: accessToken });
});

app.listen(port, hostname, () => {
	console.log(Chalk.bold.blackBright.bgGreen(`${"=".repeat(13)} API Started ${"=".repeat(14)}`));
	console.log(Chalk.bold.blackBright.bgGreen(`Listening on https://${hostname}:${port}/    `));
	console.log(Chalk.bold.blackBright.bgGreen(`${"=".repeat(40)}`));
});
