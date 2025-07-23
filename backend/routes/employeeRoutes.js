const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');


router.get("/salons/:salonId/employees", employeeController.getEmployeesBySalon);
router.post("/", employeeController.addEmployee);
router.patch("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);
router.patch("/:id/vacation", employeeController.addEmployeeVacationDate);


 module.exports = router;
