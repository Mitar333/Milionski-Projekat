const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');


router.get("/salons/:salonId/employees", employeeController.getEmployeesBySalon);
router.post("/employees", employeeController.addEmployee);
router.patch("/employees/:id", employeeController.updateEmployee);
router.delete("/employees/:id", employeeController.deleteEmployee);
router.patch("/employees/:id/vacation", employeeController.addEmployeeVacationDate);


 module.exports = router;
