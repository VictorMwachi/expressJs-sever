const userDB = {
	users: require('../model/users.json'),
	setUsers: function(data){this.users = data}
}

const jwt = require('jsonwebtoken');
require('dotenv').config()
const fsPromises = require('fs').promises
const bcrypt = require('bcrypt')
const path = require('path')

const handleLogin = async (req,res) => {
	const {user, pswd} = req.body;

	//check if all parameters exists
	if(!user || !pswd ){
		return res.status(400).json("username and password required")
	}

	//find user with the username
	const foundUser = userDB.users.find(person => person.username === user);

	//user not found scenario
	if(!foundUser){return res.status(401).json({"message":"user not found! Kindly check details and retry again"})}
	
	//check password if match
	const match = await bcrypt.compare(pswd,foundUser.password);

	//send message password doesnt match
	if(match){
		//create access json web token
		const accessToken = jwt.sign(
			{"username":foundUser.username},
			process.env.ACCESS_TOKEN_SECRET,
			{expiresIn: '60s'}
			);

		//create refresh json web token
		const refreshToken = jwt.sign(
			{"username":foundUser.username},
			process.env.REFRESH_TOKEN_SECRET,
			{expiresIn: '1d'}
			);

		//array of other users
		const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);

		//save user together with the token
		const currentUser = {...foundUser, refreshToken}

		userDB.setUsers([...otherUsers,currentUser]);


		await fsPromises.writeFile(
			path.join(__dirname,'..','model','users.json'),
			JSON.stringify(userDB.users)
			);
		res.cookie('jwt', refreshToken, {httpOnly: true, maxAge:24 * 60 * 60 * 1000 });
		res.json({accessToken});
	}
	else {
		return res.status(401).json({"message":"incorrect password kindly try again"});
	}
	
}

module.exports = { handleLogin }