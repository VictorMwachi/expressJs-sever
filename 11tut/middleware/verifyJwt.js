const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyJWT = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	if(!authHeader?.jwt){return res.sendStatus(401)}
	console.log(authHeader);//bearer token
	const token = authHeader.split(" ")[1];
	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET,
		(error, decoded) => {
			if (error) return res.sendStatus(403);// invalid token
			req.user = decoded.username
		}
		);
	next();
}

module.exports = verifyJWT;