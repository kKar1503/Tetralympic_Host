import "dotenv/config";
import express from "express";
import router from "./routes/index.js";
import Chalk from "chalk";
import { httpLogger } from "./middlewares/index.js";
const { HOSTNAME, PORT } = process.env;

const port = PORT || 3000;
const hostname = HOSTNAME;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(httpLogger);
app.use(router);

app.listen(port, hostname, () => {
	console.log(Chalk.bold.blackBright.bgGreen(`${"=".repeat(13)} API Started ${"=".repeat(14)}`));
	console.log(Chalk.bold.blackBright.bgGreen(`Listening on https://${hostname}:${port}/    `));
	console.log(Chalk.bold.blackBright.bgGreen(`${"=".repeat(40)}`));
});
