import express from 'express';
import AdminController from '../controllers/adminController.js';

const router = express.Router();

// @route   POST /api/admin/login
// @desc    Login admin
// @access  Public
router.post('/login', AdminController.login);

// @route   POST /api/admin/refresh-token
// @desc    Refresh access token using refresh token
// @access  Public
router.post('/refresh-token', AdminController.refreshToken);

export default router; 