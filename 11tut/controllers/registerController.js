const userDB = {
	users: require('../model/users.json'),
	setUsers: function(data){this.users = data}
}
const fsPromises = require('fs').promises
const bcrypt = require('bcrypt')
const path = require('path')

const handleNewUser = async (req,res) => {
	const {user, pswd} = req.body;
//check if request has all the rquired parameters
	if (!user || !pswd) return res.status(400).json({"message":"username and password required"})

// check for duplicate username
	const duplicate = userDB.users.find(person => person.username === user);
	
	if(duplicate) return res.status(409).json({"message":`username ${user} already exists`})//conflict

	try {
		const hashedPswd = await bcrypt.hash(pswd,10)//10 is for salt
		const newUser = {"username":user, "password":hashedPswd}

		userDB.setUsers([...userDB.users, newUser]);

		console.log(userDB.users);

		await fsPromises.writeFile(
		path.join(__dirname, '..','model','users.json'),JSON.stringify(userDB.users)
		);

		return res.status(201).json({"message":`user ${user} created succesfully`})
	} catch(err) {
		// statements
		return res.status(500).json({"message":err.message})
	}


}

module.exports = { handleNewUser };