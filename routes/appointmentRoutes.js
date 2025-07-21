import express from 'express';
import AppointmentController from '../controllers/appointmentController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// @route   GET /api/appointments
// @desc    Get all appointments
// @access  Private (Admin only)
router.get('/', authenticateToken, AppointmentController.getAllAppointments);

// @route   GET /api/appointments/:id
// @desc    Get appointment by ID
// @access  Private (Admin only)
router.get('/:id', authenticateToken, AppointmentController.getAppointmentById);

// @route   POST /api/appointments
// @desc    Create new appointment
// @access  Private (Admin only)
router.post('/', authenticateToken, AppointmentController.createAppointment);

// @route   PUT /api/appointments/:id
// @desc    Update appointment
// @access  Private (Admin only)
router.put('/:id', authenticateToken, AppointmentController.updateAppointment);

// @route   DELETE /api/appointments/:id
// @desc    Cancel (delete) appointment
// @access  Private (Admin only)
router.delete('/:id', authenticateToken, AppointmentController.cancelAppointment);

// @route   GET /api/appointments/client/:clientId
// @desc    Get appointments by client ID
// @access  Private (Admin only)
router.get('/client/:clientId', authenticateToken, AppointmentController.getAppointmentsByClientId);

export default router; 