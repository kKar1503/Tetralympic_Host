import express from "express";
import { Registration } from "../models/index.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "This is the home page of registration route!" });
});

router.get("/count/:id", (req, res) => {
	let id = parseInt(req.params.id);
	let register = new Registration();
	register
		.RegistrationCountByCompetitionId(id)
		.then((results) => {
			res.json({
				updated: new Date(),
				count: results.length,
				data: results,
			});
		})
		.catch((e) => {
			res.status(500);
			res.json({
				message: e.message,
			});
		})
		.finally(() => register.EndConnection());
});

router.get("/check/:tetrioId/:compId", (req, res) => {
	let tetrioId = req.params.tetrioId;
	let compId = req.params.compId;
	let register = new Registration();
	register
		.CheckRegistration(tetrioId, compId)
		.then((results) => {
			res.json({
				updated: new Date(),
				registered: results.length > 0,
			});
		})
		.catch((e) => {
			res.status(500);
			res.json({
				message: e.message,
			});
		})
		.finally(() => register.EndConnection());
});

router.get("/register/:tetrioId/:compId", (req, res) => {
	let tetrioId = req.params.tetrioId;
	let compId = req.params.compId;
	let register = new Registration();
	register
		.Register(tetrioId, compId)
		.then((results) => {
			res.json({
				updated: new Date(),
				count: results.length,
				data: results,
			});
		})
		.catch((e) => {
			res.status(500);
			res.json({
				message: e.message,
			});
		})
		.finally(() => register.EndConnection());
});

router.delete("/register/:tetrioId/:compId", (req, res) => {
	let tetrioId = req.params.tetrioId;
	let compId = req.params.compId;
	let register = new Registration();
	register
		.Unregister(tetrioId, compId)
		.then((results) => {
			if (results.legnth === 0) res.sendStatus(404);
			res.json({
				updated: new Date(),
				count: results.length,
				data: results,
			});
		})
		.catch((e) => {
			res.status(500);
			res.json({
				message: e.message,
			});
		})
		.finally(() => register.EndConnection());
});

export default router;
