import AppointmentRepository from '../repositories/appointmentRepository.js';
import ClientRepository from '../repositories/clientRepository.js';

class AppointmentService {

    // Get all appointments
    static async getAllAppointments() {
        try {
            const appointments = await AppointmentRepository.getAllAppointments();
            return appointments;
        } catch (error) {
            throw error;
        }
    }

    // Get appointment by ID
    static async getAppointmentById(id) {
        try {
            if (!id) {
                throw new Error('Appointment ID is required');
            }

            const appointment = await AppointmentRepository.getAppointmentById(id);
            if (!appointment) {
                throw new Error('Appointment not found');
            }

            return appointment;
        } catch (error) {
            throw error;
        }
    }

    // Create new appointment
    static async createAppointment(appointmentData) {
        try {
            const { client_id, time } = appointmentData;

            // Validate required fields
            if (!client_id || !time) {
                throw new Error('Client ID and time are required');
            }

            // Validate client exists
            const client = await ClientRepository.getClientById(client_id);
            if (!client) {
                throw new Error('Client not found');
            }

            // Validate time format and future date
            const appointmentTime = new Date(time);
            if (isNaN(appointmentTime.getTime())) {
                throw new Error('Invalid time format');
            }

            if (appointmentTime <= new Date()) {
                throw new Error('Appointment time must be in the future');
            }

            // Create appointment
            const newAppointment = await AppointmentRepository.createAppointment({
                client_id,
                time: appointmentTime.toISOString()
            });

            return newAppointment;
        } catch (error) {
            throw error;
        }
    }

    // Update appointment
    static async updateAppointment(id, updateData) {
        try {
            if (!id) {
                throw new Error('Appointment ID is required');
            }

            // Check if appointment exists
            const existingAppointment = await AppointmentRepository.getAppointmentById(id);
            if (!existingAppointment) {
                throw new Error('Appointment not found');
            }

            const { client_id, time } = updateData;

            // Validate client if provided
            if (client_id) {
                const client = await ClientRepository.getClientById(client_id);
                if (!client) {
                    throw new Error('Client not found');
                }
            }

            // Validate time if provided
            if (time) {
                const appointmentTime = new Date(time);
                if (isNaN(appointmentTime.getTime())) {
                    throw new Error('Invalid time format');
                }

                if (appointmentTime <= new Date()) {
                    throw new Error('Appointment time must be in the future');
                }

                updateData.time = appointmentTime.toISOString();
            }

            // Update appointment
            const updatedAppointment = await AppointmentRepository.updateAppointment(id, updateData);
            return updatedAppointment;
        } catch (error) {
            throw error;
        }
    }

    // Cancel (delete) appointment
    static async cancelAppointment(id) {
        try {
            if (!id) {
                throw new Error('Appointment ID is required');
            }

            // Check if appointment exists
            const existingAppointment = await AppointmentRepository.getAppointmentById(id);
            if (!existingAppointment) {
                throw new Error('Appointment not found');
            }

            // Delete appointment
            const deletedAppointment = await AppointmentRepository.deleteAppointment(id);
            return deletedAppointment;
        } catch (error) {
            throw error;
        }
    }

    // Get appointments by client ID
    static async getAppointmentsByClientId(clientId) {
        try {
            if (!clientId) {
                throw new Error('Client ID is required');
            }

            // Validate client exists
            const client = await ClientRepository.getClientById(clientId);
            if (!client) {
                throw new Error('Client not found');
            }

            const appointments = await AppointmentRepository.getAppointmentsByClientId(clientId);
            return appointments;
        } catch (error) {
            throw error;
        }
    }
}

export default AppointmentService; 