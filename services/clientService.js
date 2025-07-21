import ClientRepository from '../repositories/clientRepository.js';

class ClientService {

    // Get all clients
    static async getAllClients() {
        try {
            const clients = await ClientRepository.getAllClients();
            return clients;
        } catch (error) {
            throw error;
        }
    }

    // Get client by ID
    static async getClientById(id) {
        try {
            if (!id) {
                throw new Error('Client ID is required');
            }

            const client = await ClientRepository.getClientById(id);
            if (!client) {
                throw new Error('Client not found');
            }

            return client;
        } catch (error) {
            throw error;
        }
    }

    // Find client by email
    static async findByEmail(email) {
        try {
            if (!email) {
                throw new Error('Email is required');
            }

            const client = await ClientRepository.findByEmail(email);
            return client;
        } catch (error) {
            throw error;
        }
    }
}

export default ClientService; 