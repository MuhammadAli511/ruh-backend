import supabase from '../config/database.js';

class ClientRepository {

    // Get all clients
    static async getAllClients() {
        try {
            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            throw error;
        }
    }

    // Get client by ID
    static async getClientById(id) {
        try {
            const { data, error } = await supabase
                .from('clients')
                .select('*')
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

    // Find client by email
    static async findByEmail(email) {
        try {
            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .eq('email', email.toLowerCase().trim())
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
                throw new Error(`Database error: ${error.message}`);
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    // Check if email exists
    static async emailExists(email) {
        try {
            const { data, error } = await supabase
                .from('clients')
                .select('id')
                .eq('email', email.toLowerCase().trim())
                .single();

            if (error && error.code !== 'PGRST116') {
                throw new Error(`Database error: ${error.message}`);
            }

            return !!data;
        } catch (error) {
            throw error;
        }
    }
}

export default ClientRepository; 