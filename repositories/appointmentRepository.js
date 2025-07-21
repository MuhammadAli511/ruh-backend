import supabase from '../config/database.js';

class AppointmentRepository {

    // Get all appointments with client information
    static async getAllAppointments() {
        try {
            const { data, error } = await supabase
                .from('appointments')
                .select(`
                    *,
                    client:clients(*)
                `)
                .order('time', { ascending: true });

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            throw error;
        }
    }

    // Get appointment by ID with client information
    static async getAppointmentById(id) {
        try {
            const { data, error } = await supabase
                .from('appointments')
                .select(`
                    *,
                    client:clients(*)
                `)
                .eq('id', id)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    // Get appointments by client ID
    static async getAppointmentsByClientId(clientId) {
        try {
            const { data, error } = await supabase
                .from('appointments')
                .select(`
                    *,
                    client:clients(*)
                `)
                .eq('client_id', clientId)
                .order('time', { ascending: true });

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            throw error;
        }
    }

    // Create new appointment
    static async createAppointment(appointmentData) {
        try {
            const { data, error } = await supabase
                .from('appointments')
                .insert([appointmentData])
                .select(`
                    *,
                    client:clients(*)
                `)
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    // Update appointment
    static async updateAppointment(id, updateData) {
        try {
            const { data, error } = await supabase
                .from('appointments')
                .update(updateData)
                .eq('id', id)
                .select(`
                    *,
                    client:clients(*)
                `)
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    // Delete appointment
    static async deleteAppointment(id) {
        try {
            const { data, error } = await supabase
                .from('appointments')
                .delete()
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default AppointmentRepository; 