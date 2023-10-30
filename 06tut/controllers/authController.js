const userDB = {
	users: require('../model/users.json'),
	setUsers: function(data){this.users = data}
}

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
	if(!match)
		{ return res.status(401).json({"message":"incorrect password kindly try again"})}
	else {
			return res.json({"message":`Sucess! ${foundUser.username} logged in`})
	}
	
}

module.exports = { handleLogin }