import express from 'express';
import AdminController from '../controllers/adminController.js';

const router = express.Router();

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', AdminController.login);

// @route   POST /api/users/refresh-token
// @desc    Refresh access token using refresh token
// @access  Public
router.post('/refresh-token', AdminController.refreshToken);

export default router; 