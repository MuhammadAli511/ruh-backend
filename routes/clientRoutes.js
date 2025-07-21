import express from 'express';
import ClientController from '../controllers/clientController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// @route   GET /api/clients
// @desc    Get all clients
// @access  Private (Admin only)
router.get('/', authenticateToken, ClientController.getAllClients);

// @route   GET /api/clients/:id
// @desc    Get client by ID
// @access  Private (Admin only)
router.get('/:id', authenticateToken, ClientController.getClientById);

export default router; 