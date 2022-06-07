import express from "express";
import { CompetitionInterface } from "../interface/index.js";
import { Competition } from "../models/index.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		message: `Please include the competition ID in url, i.e. /competition/id`,
	});
});

router.post("/", (req, res) => {
	let comp;
	try {
		comp = new CompetitionInterface(req.body, { status: "number" });
	} catch (e) {
		console.log(e);
		res.status(422);
		res.json({
			message: `Competition is not properly defined.`,
		});
		return;
	}
	let competition = new Competition();
	competition
		.InsertOneCompetition(comp)
		.then((result) => {
			res.status(201);
			res.json({
				affectedRows: result.affectedRows,
				message: `Successfully insert ${result.affectedRows} competition.`,
			});
		})
		.catch((e) => {
			res.status(500);
			res.json({
				message: e.message,
			});
		})
		.finally(() => competition.EndConnection());
});

router.get("/all", (req, res) => {
	let comp = new Competition();
	comp.GetCompetitions()
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
		.finally(() => comp.EndConnection());
});

router.get("/:id", async (req, res) => {
	let id = parseInt(req.params.id);
	let comp = new Competition();
	comp.GetCompetitionById(id)
		.then((results) => {
			if (results.length == 0) {
				res.status(404).json({
					message: `No competition with the id, ${id}, found, please check.`,
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
		.finally(() => comp.EndConnection());
});

export default router;
