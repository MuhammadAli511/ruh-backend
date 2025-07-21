import ClientService from '../services/clientService.js';

class ClientController {

    // Get all clients endpoint
    static async getAllClients(req, res) {
        try {
            const clients = await ClientService.getAllClients();

            res.status(200).json({
                success: true,
                message: 'Clients retrieved successfully',
                data: clients
            });

        } catch (error) {
            console.error('Get clients error:', error);

            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Get client by ID endpoint
    static async getClientById(req, res) {
        try {
            const { id } = req.params;
            const client = await ClientService.getClientById(id);

            res.status(200).json({
                success: true,
                message: 'Client retrieved successfully',
                data: client
            });

        } catch (error) {
            console.error('Get client error:', error);

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

export default ClientController; 