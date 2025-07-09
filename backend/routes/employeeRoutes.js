const express = require('express');
const router = express.Router();
const employeController = require('../controllers/employeController');


router.get("api/salons/:salonId/employees", employeController.getEmployeesBySalon);
router.post("api/employees", employeController.addEmployee);
router.patch("api/employees/:id", employeController.updateEmployee);
router.delete("api/employees/:id", employeController.deleteEmployee);
router.patch("api/employees/:id/vacation", employeController.setEmployeeVacation);


 module.exports = router;
