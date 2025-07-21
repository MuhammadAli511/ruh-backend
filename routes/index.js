import express from 'express';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Ruh API is running',
        timestamp: new Date().toISOString()
    });
});

// Admin routes (includes login)
router.use('/admin', adminRoutes);


export default router;