const data ={
	employees: require('../model/employees.json'),
	setEmployees: function(data){
		this.employees = data
	}
}

const getAllEmployees = (req,res) => {
	res.json(data.employees);
}

const updateEmployee = (req,res) => {
	let arrItemIdx;
	const employee = data.employees.filter((item,idx) => {
		if(item.id==req.body.id){
			arrItemIdx = idx;
			return item;
		}
		else {
			return undefined;
		}
	})[0]
	//console.log(employee,arrItemIdx)
	if(arrItemIdx){
		employee.firstname = req.body.firstname
		employee.lastname = req.body.lastname
		data.employees.splice(arrItemIdx,1,employee)
		data.setEmployees(data.employees)
		res.json(data.employees)
	}
	else {
		res.status(400).json("error employee not found");
	}
}

const addEmployee = (req,res) => {
	const newEmployee = {}
	newEmployee.id = data.employees.length + 1 || 1
	newEmployee.firstname = req.body.firstname
	newEmployee.lastname = req.body.lastname
	data.employees.push(newEmployee);
	data.setEmployees(data.employees)
	res.status(201).json(data.employees)
}

const deleteEmployee = (req, res) => {
	const employees = data.employees.filter(item => item.id !== req.body.id)
	data.setEmployees(employees)
	res.json(data.employees)
}

//get employee with corresponding id, assume id is unique for every employee
const getEmployee = (req,res) => res.json(data.employees.filter(item => item.id==req.params.id)[0])

module.exports = {getAllEmployees, addEmployee,updateEmployee,deleteEmployee,getEmployee}