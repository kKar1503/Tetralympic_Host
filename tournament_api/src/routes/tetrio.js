import express from "express";
import { TetrioUser } from "../models/index.js";
import { authenticateToken } from "../middlewares/index.js";
import { TetrioApi } from "../api/index.js";
import { TetrioUserInterface } from "../interface/index.js";
const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "This is the home page of tetrio route!" });
});

router.get("/users", async (req, res) => {
	let user = new TetrioUser();
	let users = await user.GetUsers();
	user.EndConnection();
	res.json({
		updated: new Date(),
		count: users.length,
		data: users,
	});
});

router.get("/user", (req, res) => {
	res.json({
		message: `Please include the username in url, i.e. /user/<username>`,
	});
});

router.post("/user", (req, res) => {
	let user;
	try {
		user = new TetrioUserInterface(req.body);
	} catch (e) {
		res.status(422);
		res.json({
			message: `User is not properly defined.`,
		});
	}
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
	let matchingUser = await user.GetOneUserByName(username);
	user.EndConnection();
	if (matchingUser.length == 0) {
		res.status(404).json({
			message: `No user with the username, ${username}, found, please check spelling.`,
		});
	} else {
		res.json({
			updated: new Date(),
			data: matchingUser,
		});
	}
});

router.post("/snapshot", authenticateToken, async (req, res) => {
	let authData = req.authData;
	if (!authData.snapshot) res.sendStatus(403);
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
