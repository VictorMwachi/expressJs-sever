const data ={}

data.employees = require('../data/employees.json');

const getAllEmployees = (req,res) => {
	res.json(data.employess);
}

const updateEmployee = (req,res) => {
		res.json({
			"firstname": req.body.firstname,
			"lastname": req.body.lastname
		})
	}

const addEmployee = (req,res) => {
	res.json({
		"firstname": req.body.firstname,
		"lastname": req.body.lastname
	})
}

const deleteEmployee = (req,res) => {
	res.json({"id":req.body.id})
}

const getEmployee = (req,res) => {res.json({"id":req.params.id})}

module.exports = {getAllEmployees, addEmployee,updateEmployee,deleteEmployee,getEmployee}