import supabase from '../config/database.js';

class AdminRepository {

    // Find admin by email
    static async findByEmail(email) {
        try {
            const { data, error } = await supabase
                .from('admin')
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

    static async getAdminById(id) {
        try {
            const { data, error } = await supabase
                .from('admin')
                .select('*')
                .eq('id', id)
                .single();

            if (error && error.code !== 'PGRST116') {
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
                .from('admin')
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

export default AdminRepository; 