const userDB = {
	users: require('../model/users.json'),
	setUsers: function(data){this.users = data}
}
const fsPromises = require('fs').promises
const bcrypt = require('bcrypt')
const path = require('path')

const handleLogin = async (res,req) =>{
	const { user, pswd } = req.body;

	//check if all parameters exists
	if(!user || !pswd ){res.status(409).json("username and password required")}

	//find user with the username
	const foundUser = userDB.users.find(person => person.username === user);
	
	//check password if match
	if(foundUser){
		const match = await bcrypt.compare(pswd,foundUser.password);
		if(match){
			res.json({"message":`Sucess! ${foundUser.username} logged in`})
		}
		else {
			res.json({"message":"incorrect password kindly try again"})
		}
	}
	else{
		//unauthorised
		res.status(400).json({"message":"user not found! Kindly check details and retry again"})
	}


}

module.exports = { handleLogin }