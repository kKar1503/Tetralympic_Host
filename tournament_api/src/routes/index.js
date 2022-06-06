import "dotenv/config";
import express from "express";
import registration from "./registration.js";
import tetrio from "./tetrio.js";
import discord from "./discord.js";
import competition from "./competition.js";
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "This is the home page of Tetralympic API!" });
});

router.post("/authenticate", (req, res) => {
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

router.use("/competition", competition);

router.use("/tetrio", tetrio);

router.use("/discord", discord);

router.use("/registration", registration);

export default router;
