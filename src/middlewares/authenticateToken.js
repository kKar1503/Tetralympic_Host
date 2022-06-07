import "dotenv/config";
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;

export function authenticateToken(req, res, next) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, SECRET_KEY, (err, data) => {
		if (err) return res.sendStatus(403);
		req.authData = data;
		next();
	});
}
