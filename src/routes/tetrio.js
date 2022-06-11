import express from "express";
import { TetrioUser } from "../models/index.js";
import { authenticateToken } from "../middlewares/index.js";
import { TetrioApi } from "../api/index.js";
import { TetrioUserInterface } from "../interface/index.js";
const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "This is the home page of tetrio route!" });
});

router.get("/users", authenticateToken, (req, res) => {
	let authData = req.authData;
	if (!authData.getTetrioUsers) res.sendStatus(403);
	let user = new TetrioUser();
	user.GetUsers()
		.then((users) => {
			res.json({
				updated: new Date(),
				count: users.length,
				data: users,
			});
		})
		.catch((e) => {
			res.status(500);
			res.json({
				message: e.message,
			});
		})
		.finally(() => user.EndConnection());
});

router.get("/user", (req, res) => {
	res.json({
		message: `Please include the username in url, i.e. /user/<username>`,
	});
});

router.post("/user/:username", async (req, res) => {
	let tetrioApi = new TetrioApi();
	let user;
	try {
		user = await tetrioApi.getOneUser(req.params.username);
	} catch (e) {
		res.status(404).json({
			message: `No user with the username, ${req.params.username}, found, please check spelling.`,
		});
		return;
	}
	console.log("skipped");
	user.highest_rank = await tetrioApi.getPeakRank(req.params.username);
	let tetrioUser = new TetrioUser();
	tetrioUser
		.InsertOneUser(user)
		.then((result) => {
			res.status(201);
			res.json({
				affectedRows: result.affectedRows,
				message: `Successfully insert ${result.affectedRows} user.`,
			});
		})
		.catch((e) => {
			if (e.errno === 1062) {
				res.status(422).json({
					message: "Already inserted",
				});
				return;
			}
			res.status(500);
			res.json({
				message: e.message,
			});
		})
		.finally(() => tetrioUser.EndConnection());
});

router.post("/phone/:username/:phone", async (req, res) => {
	let phone = req.params.phone;
	let tetrioApi = new TetrioApi();
	let user;
	try {
		user = await tetrioApi.getOneUser(req.params.username);
	} catch (e) {
		res.status(404).json({
			message: `No user with the username, ${req.params.username}, found, please check spelling.`,
		});
		return;
	}
	let tetrioUser = new TetrioUser();
	tetrioUser
		.InsertOnePhone(user.id, phone)
		.then((result) => {
			res.status(201);
			res.json({
				affectedRows: result.affectedRows,
				message: `Successfully insert ${result.affectedRows} user.`,
			});
		})
		.catch((e) => {
			if (e.errno === 1062) {
				res.status(422).json({
					message: "Already inserted",
				});
				return;
			}
			res.status(500);
			res.json({
				message: e.message,
			});
		})
		.finally(() => tetrioUser.EndConnection());
});

router.get("/user/:username", async (req, res) => {
	let username = req.params.username;
	let user = new TetrioUser();
	user.GetOneUserByName(username)
		.then((results) => {
			if (results.length == 0) {
				res.status(404).json({
					message: `No user with the username, ${username}, found, please check spelling.`,
				});
			} else {
				res.json({
					updated: new Date(),
					data: results,
				});
			}
		})
		.catch((e) => {
			res.status(500);
			res.json({
				message: e.message,
			});
		})
		.finally(() => user.EndConnection());
});

router.get("/userById/:id", async (req, res) => {
	let id = req.params.id;
	let user = new TetrioUser();
	user.GetOneUserById(id)
		.then((results) => {
			if (results.length == 0) {
				res.status(404).json({
					message: `No user with the id, ${id}, found, please check spelling.`,
				});
			} else {
				res.json({
					updated: new Date(),
					data: results,
				});
			}
		})
		.catch((e) => {
			res.status(500);
			res.json({
				message: e.message,
			});
		})
		.finally(() => user.EndConnection());
});

router.post("/snapshot", authenticateToken, async (req, res) => {
	let authData = req.authData;
	if (!authData.pushSnapshots) res.sendStatus(403);
	let api = new TetrioApi();
	let snapshot;
	try {
		snapshot = await api.getSnapshot();
	} catch (e) {
		res.status(500);
		res.json({
			message: e.message,
		});
	}

	let user = new TetrioUser({ useLogger: true, loggingLength: 60 });
	user.PushSnapshot(snapshot)
		.then((result) => {
			res.status(201);
			res.json({
				message: `Successfully pushed snapshot of ${result.affectedRows} count.`,
			});
		})
		.catch((e) => {
			res.status(500);
			res.json({
				message: e.message,
			});
		})
		.finally(() => user.EndConnection());
});

export default router;
