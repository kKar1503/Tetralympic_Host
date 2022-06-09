import express from "express";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { DiscordUser, TetrioUser } from "../models/index.js";
import { DiscordUserInterface } from "../interface/index.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "This is the home page of discord route!" });
});

router.get("/users", authenticateToken, (req, res) => {
	let authData = req.authData;
	if (!authData.getDiscordUser) res.sendStatus(403);
	let user = new DiscordUser();
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

router.post("/user", (req, res) => {
	let tetrioId = req.query.tetrioId;
	let user;
	try {
		user = new DiscordUserInterface(req.body, tetrioId);
	} catch (e) {
		res.status(422);
		res.json({
			message: `User is not properly defined.`,
		});
	}
	let discordUser = new DiscordUser();
	discordUser
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
		.finally(() => discordUser.EndConnection());
});

router.put("/user/:discordId", async (req, res) => {
	let tetrioUsername = req.body.tetrioUsername;
	let discordId = req.params.discordId;

	let tetrioUser = new TetrioUser();
	let foundUser;

	try {
		foundUser = await tetrioUser.GetOneUserByName(tetrioUsername);
	} catch (e) {
		res.status(500).json({
			message: `Database Error.`,
		});
	}
	if (foundUser.length === 0) {
		res.status(404).json({
			message: `No user with the Tetrio username, ${tetrioUsername}, found, please check again.`,
		});
		return;
	}
	let tetrioId = foundUser[0].id;

	if (!tetrioId) {
		return res.status(422).json({
			message: `tetrioId must be defined.`,
		});
	}
	let discordUser = new DiscordUser();
	discordUser
		.BindTetrio(discordId, tetrioId)
		.then((result) => {
			res.json({
				affectedRows: result.affectedRows,
				message: `Successfully updated ${result.affectedRows} user.`,
			});
		})
		.catch((e) => {
			res.status(500);
			res.json({
				message: e.message,
			});
		})
		.finally(() => discordUser.EndConnection());
});

router.delete("/unbind/:discordId", async (req, res) => {
	let user = new DiscordUser();
	let discordId = req.params.discordId;

	user.UnbindTetrio(discordId)
		.then((result) => {
			if (result.affectedRows === 0) {
				res.json({
					updated: new Date(),
					unbinded: false,
					message: "Was not binded",
				});
				return;
			}
			res.json({
				updated: new Date(),
				unbinded: true,
				message: "Unbinded",
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

router.get("/user/:id", async (req, res) => {
	let id = req.params.id;
	let user = new DiscordUser();
	user.GetOneUserByID(id)
		.then((results) => {
			if (results.length == 0) {
				res.status(404).json({
					message: `No user with the id, ${id}, found, please check again.`,
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

router.get("/whois/:username", async (req, res) => {
	let username = req.params.username;
	let tetrioUser = new TetrioUser();
	let foundUser;
	try {
		foundUser = await tetrioUser.GetOneUserByName(username);
	} catch (e) {
		return res.status(404).json({
			message: `No user with the Tetrio username, ${username}, found, please check again.`,
		});
	}
	if (foundUser.length === 0)
		return res.status(404).json({
			message: `No user with the Tetrio username, ${username}, found, please check again.`,
		});
	let user = new DiscordUser();
	user.GetOneUserByTetrio(foundUser[0].id)
		.then((results) => {
			if (results.length == 0) {
				res.status(404).json({
					message: `No one is binded with ${username}`,
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

export default router;
