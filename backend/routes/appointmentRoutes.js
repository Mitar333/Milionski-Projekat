const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/appointments', appointmentController.createAppointment);
router.get('/salons/:salonId/appointments/available', appointmentController.getAvailableTimes);
router.get('/salons/:salonId/appointments', appointmentController.getSalonAppointments);
router.get('/employees/:employeeId/appointments', appointmentController.getEmployeeAppointments);
router.get('/users/:userId/appointments', appointmentController.getUserAppointments);
router.patch('/appointments/:id/status', appointmentController.updateAppointmentStatus);
router.patch('/appointments/:id/cancel', appointmentController.cancelAppointment);
router.patch("/appointments/:id/",appointmentController.updateAppointment);

 module.exports = router;
