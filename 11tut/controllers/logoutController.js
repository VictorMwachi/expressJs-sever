const userDB = {
	'users':require('../model/users.json'),
	'setUsers':(data)=>this.users = data
}

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req,res) => {
	//On client also delete access token
	const cookies = req.cookies;

	if(!cookies?.jwt) return res.sendStatus(204);//no content
	const refreshToken = cookies.jwt;
	const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);

	if(!foundUser){
		res.clearCookie('jwt',{'httpOnly':true});
		return res.sendStatus(204)//no content to send back
	}

	const otherUsers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
	const currentUser = {...foundUser,refreshToken:''};
	userDB.setUsers([...otherUsers,currentUser]);
	await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'),JSON.stringify(userDB.users));

	res.clearCookie('jwt',{httpOnly:true})// in production add secure: true for https
	res.sendStatus(204)
}

module.exports = { handleLogout };