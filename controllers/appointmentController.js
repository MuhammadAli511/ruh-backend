import AppointmentService from '../services/appointmentService.js';

class AppointmentController {

    // Get all appointments endpoint
    static async getAllAppointments(req, res) {
        try {
            const appointments = await AppointmentService.getAllAppointments();

            res.status(200).json({
                success: true,
                message: 'Appointments retrieved successfully',
                data: appointments
            });

        } catch (error) {
            console.error('Get appointments error:', error);

            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Get appointment by ID endpoint
    static async getAppointmentById(req, res) {
        try {
            const { id } = req.params;
            const appointment = await AppointmentService.getAppointmentById(id);

            res.status(200).json({
                success: true,
                message: 'Appointment retrieved successfully',
                data: appointment
            });

        } catch (error) {
            console.error('Get appointment error:', error);

            if (error.message.includes('Appointment not found') ||
                error.message.includes('Appointment ID is required')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Create new appointment endpoint
    static async createAppointment(req, res) {
        try {
            const appointmentData = req.body;
            const newAppointment = await AppointmentService.createAppointment(appointmentData);

            res.status(201).json({
                success: true,
                message: 'Appointment created successfully',
                data: newAppointment
            });

        } catch (error) {
            console.error('Create appointment error:', error);

            if (error.message.includes('Client ID and time are required') ||
                error.message.includes('Client not found') ||
                error.message.includes('Invalid time format') ||
                error.message.includes('Appointment time must be in the future')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Update appointment endpoint
    static async updateAppointment(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedAppointment = await AppointmentService.updateAppointment(id, updateData);

            res.status(200).json({
                success: true,
                message: 'Appointment updated successfully',
                data: updatedAppointment
            });

        } catch (error) {
            console.error('Update appointment error:', error);

            if (error.message.includes('Appointment not found') ||
                error.message.includes('Appointment ID is required')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }

            if (error.message.includes('Client not found') ||
                error.message.includes('Invalid time format') ||
                error.message.includes('Appointment time must be in the future')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Cancel (delete) appointment endpoint
    static async cancelAppointment(req, res) {
        try {
            const { id } = req.params;
            const deletedAppointment = await AppointmentService.cancelAppointment(id);

            res.status(200).json({
                success: true,
                message: 'Appointment cancelled successfully',
                data: deletedAppointment
            });

        } catch (error) {
            console.error('Cancel appointment error:', error);

            if (error.message.includes('Appointment not found') ||
                error.message.includes('Appointment ID is required')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Get appointments by client ID endpoint
    static async getAppointmentsByClientId(req, res) {
        try {
            const { clientId } = req.params;
            const appointments = await AppointmentService.getAppointmentsByClientId(clientId);

            res.status(200).json({
                success: true,
                message: 'Client appointments retrieved successfully',
                data: appointments
            });

        } catch (error) {
            console.error('Get client appointments error:', error);

            if (error.message.includes('Client not found') ||
                error.message.includes('Client ID is required')) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}

export default AppointmentController; 