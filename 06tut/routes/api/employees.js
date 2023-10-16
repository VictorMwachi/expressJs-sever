const express = require('express');
const router = express.Router();
const path = require('path')

const employeesControllers = require('../../controllers/employeesControllers')

router.route('/')
	.get(employeesControllers.getAllEmployees)
	.post(employeesControllers.addEmployee)
	.put(employeesControllers.updateEmployee)
	.delete(employeesControllers.deleteEmployee);
router.route('/:id')
	.get(employeesControllers.getEmployee);


module.exports = router