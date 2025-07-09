const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/api/appointments', appointmentController.createAppointment);
router.get('/api/salons/:salonId/appointments/available', appointmentController.getAvailableTimes);
router.get('/api/salons/:salonId/appointments', appointmentController.getSalonAppointments);
router.get('/api/employees/:employeeId/appointments', appointmentController.getEmployeeAppointments);
router.get('/api/users/:userId/appointments', appointmentController.getUserAppointments);
router.patch('/api/appointments/:id/status', appointmentController.updateAppointmentStatus);
router.patch('/api/appointments/:id/cancel', appointmentController.cancelAppointment);
router.patch("/api/appointments/:id/",appointmentController.updateAppointment);

 module.exports = router;
