import "dotenv/config";
import { ActivityLog } from "../../logs/Logger.js";
import express from "express";
import router from "./router/index.js";
const { HOSTNAME, PORT } = process.env;

const port = PORT || 3000;
const hostname = HOSTNAME;
app = express();
app.use(router);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res) => {
	res.on("finish", () => ActivityLog(0, `${req.method} ${req.url} [${res.statusCode}]`));
});
app.listen(port, hostname, () => ActivityLog(0, `Listening on port https://${host}:${port}/`));
