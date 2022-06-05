import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "This is the home page of registration route!" });
});

export default router;
