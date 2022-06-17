import express from "express";
import { Registration, TetrioUser, Competition } from "../models/index.js";
import { Validation } from "../controllers/index.js";

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
			res.status(500).json({
				message: e.message,
			});
		})
		.finally(() => register.EndConnection());
});

router.post("/register/:tetrioId/:compId", async (req, res) => {
	let tetrioId = req.params.tetrioId;
	let compId = req.params.compId;
	let competition = new Competition();
	let matchingCompetition;
	try {
		matchingCompetition = await competition.GetCompetitionById(compId);
		if (matchingCompetition.length === 0) {
			res.status(404).json({
				message: `No competition with the id, ${compId}, found, please check again.`,
			});
		} else {
			matchingCompetition = matchingCompetition[0];
		}
	} catch (e) {
		res.status(422).json({
			message: e.message,
		});
	}
	competition.EndConnection();
	let tetrioUser = new TetrioUser();
	tetrioUser
		.GetOneUserById(tetrioId)
		.then((user) => {
			if (user.length == 0) {
				res.status(404).json({
					message: `No user with the id, ${tetrioId}, found, please check again.`,
				});
			} else {
				Validation(user[0], matchingCompetition, { validateByPeak: false })
					.then(() => {
						let register = new Registration();
						register
							.Register(tetrioId, compId)
							.then((results) => {
								res.status(201).json({
									updated: new Date(),
									message: `Successfully register ${results.affectedRows} user(s).`,
								});
							})
							.catch((e) => {
								if (e.errno === 1062)
									res.status(422).json({ message: `Already registered.` });
								else
									res.status(500).json({
										message: e.message,
									});
							})
							.finally(() => register.EndConnection());
					})
					.catch((e) => {
						res.status(422).json({
							message: e.message,
						});
					});
			}
		})
		.catch((e) => {
			res.status(422).json({
				message: e.message,
			});
		})
		.finally(() => tetrioUser.EndConnection());
});

router.delete("/register/:tetrioId/:compId", (req, res) => {
	let tetrioId = req.params.tetrioId;
	let compId = req.params.compId;
	let register = new Registration();
	register
		.Unregister(tetrioId, compId)
		.then((results) => {
			if (results.affectedRows === 0) res.sendStatus(404);
			else
				res.json({
					updated: new Date(),
					message: `Successfully unregister ${results.affectedRows} user(s).`,
				});
		})
		.catch((e) => {
			res.status(500).json({
				message: e.message,
			});
		})
		.finally(() => register.EndConnection());
});

router.get("/participants/:compId", (req, res) => {
	let compId = req.params.compId;
	let register = new Registration();
	register
		.GetParticipants(compId)
		.then((results) => {
			res.json({
				updated: new Date(),
				count: results.length,
				data: results,
			});
		})
		.catch((e) => {
			res.status(500).json({
				message: e.message,
			});
		})
		.finally(() => register.EndConnection());
});

router.post("/checkin/:tetrioId", async (req, res) => {
	let tetrioId = req.params.tetrioId;
	let registration = new Registration();
	registration
		.CheckIn(tetrioId)
		.then((results) => {
			console.log(results);
			if (results.affectedRows == 0) {
				res.status(404).json({
					message: `Not found`,
				});
			} else if (results.changedRows == 0) {
				res.status(422).json({
					message: `Already updated`,
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
		.finally(() => registration.EndConnection());
});

export default router;
