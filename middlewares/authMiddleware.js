import AdminService from '../services/adminService.js';

// Middleware to authenticate JWT tokens
const authenticateToken = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access token is required'
            });
        }

        // Verify token
        const decoded = AdminService.verifyToken(token);

        // Add admin information to request object
        req.admin = {
            userId: decoded.userId,
            email: decoded.email
        };

        next();
    } catch (error) {
        console.error('Authentication error:', error);

        if (error.message.includes('Invalid or expired token')) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Authentication failed'
        });
    }
};

export { authenticateToken }; 