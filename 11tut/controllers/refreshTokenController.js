const userDB = {
	"users":require('../model/users.json'),
	"setUsers": function(data){
		return this.users = data
	}
}

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req,res) => {
	const cookies = req.cookies
	if(!cookies?.jwt) return res.sendStatus(401);
	console.log(cookies)
	const refreshToken = cookies.jwt


	const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);

	if(!foundUser) return res.sendStatus(403)//forbbiden
	//evaluate jwt
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(error,decoded) =>{
			if(error || foundUser.username !== decoded.username) return res.sendStatus(403);
			const accessToken = jwt.sign(
				{"username":foundUser.username},
				process.env.ACCESS_TOKEN_SECRET,
				{expiresIn: '30s'}
				);
			res.json({ accessToken })
		}

		)
}

module.exports = { handleRefreshToken }