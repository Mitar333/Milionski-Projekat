const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/', appointmentController.createAppointment);
router.get('/salons/:salonId/appointments/available', appointmentController.getAvailableTimes);
router.get('/salons/:salonId/:employeeId/:serviceId/appointments', appointmentController.getSalonAppointments);
router.get('/employees/:employeeId/appointments', appointmentController.getEmployeeAppointments);
router.get('/users/:userId/appointments', appointmentController.getUserAppointments);
router.patch('/:id/status', appointmentController.updateAppointmentStatus);
router.patch('/:id/cancel', appointmentController.cancelAppointment);
router.patch("/:id",appointmentController.updateAppointment);

 module.exports = router;
