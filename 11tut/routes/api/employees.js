const express = require('express');
const router = express.Router();
const path = require('path')
const verifyJWT = require('../../middleware/verifyJwt');

const employeesControllers = require('../../controllers/employeesControllers')

router.route('/')
	.get(verifyJWT,employeesControllers.getAllEmployees)
	.post(employeesControllers.addEmployee)
	.put(employeesControllers.updateEmployee)
	.delete(employeesControllers.deleteEmployee);
router.route('/:id')
	.get(employeesControllers.getEmployee);


module.exports = router