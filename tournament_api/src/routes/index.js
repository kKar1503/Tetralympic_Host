import express from "express";
import registration from "./registration.js";
import tetrio from "./tetrio.js";
import discord from "./discord.js";
import competition from "./competition.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "This is the home page of Tetralympic API!" });
});

router.use("/competition", competition);

router.use("/tetrio", tetrio);

router.use("/discord", discord);

router.use("/register", registration);

export default router;
