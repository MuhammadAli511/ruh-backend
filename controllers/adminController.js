import AdminService from '../services/adminService.js';

class AdminController {

    // Login endpoint
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Authenticate admin using service
            const result = await AdminService.authenticateAdmin(email, password);

            // Return success response
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
            });

        } catch (error) {
            console.error('Login error:', error);

            // Handle authentication errors
            if (error.message.includes('Email and password are required') ||
                error.message.includes('Invalid email or password')) {
                return res.status(401).json({
                    success: false,
                    message: error.message
                });
            }

            // Generic error response
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Refresh token endpoint
    static async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token is required'
                });
            }

            // Refresh tokens using service
            const result = await AdminService.refreshTokens(refreshToken);

            res.status(200).json({
                success: true,
                message: 'Tokens refreshed successfully',
                data: result
            });

        } catch (error) {
            console.error('Refresh token error:', error);

            // Handle token errors
            if (error.message.includes('Invalid or expired refresh token')) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid or expired refresh token'
                });
            }

            // Generic error response
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}

export default AdminController; 