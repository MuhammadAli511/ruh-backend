import AdminRepository from '../repositories/AdminRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AdminService {


    // Hash password
    static async hashPassword(password) {
        const saltRounds = 12;
        return await bcrypt.hash(password, saltRounds);
    }

    // Compare password
    static async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    // Generate access token (short-lived)
    static generateAccessToken(admin) {
        return jwt.sign(
            {
                userId: admin.id,
                email: admin.email,
                type: 'access'
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
    }

    // Generate refresh token (long-lived)
    static generateRefreshToken(admin) {
        return jwt.sign(
            {
                userId: admin.id,
                email: admin.email,
                type: 'refresh'
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
    }

    // Verify access token
    static verifyToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.type !== 'access') {
                throw new Error('Invalid token type');
            }
            return decoded;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

    // Verify refresh token
    static verifyRefreshToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.type !== 'refresh') {
                throw new Error('Invalid token type');
            }
            return decoded;
        } catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    }

    // Authenticate admin (login business logic)
    static async authenticateAdmin(email, password) {
        try {
            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            // Find admin by email (includes password hash)
            const admin = await AdminRepository.findByEmail(email);
            if (!admin) {
                throw new Error('Invalid email or password');
            }

            // Compare password
            const isValidPassword = await this.comparePassword(password, admin.password_hash);
            if (!isValidPassword) {
                throw new Error('Invalid email or password');
            }

            // Remove password hash from admin object
            const { password_hash, ...adminWithoutPassword } = admin;

            // Generate tokens
            const accessToken = this.generateAccessToken(adminWithoutPassword);
            const refreshToken = this.generateRefreshToken(adminWithoutPassword);

            return {
                admin: adminWithoutPassword,
                accessToken,
                refreshToken
            };

        } catch (error) {
            throw error;
        }
    }


    // Refresh tokens using refresh token
    static async refreshTokens(refreshToken) {
        try {
            // Verify refresh token
            const decoded = this.verifyRefreshToken(refreshToken);

            // Get admin data
            const admin = await AdminRepository.getAdminById(decoded.userId);
            if (!admin) {
                throw new Error('Admin not found');
            }

            // Generate new tokens
            const newAccessToken = this.generateAccessToken(admin);
            const newRefreshToken = this.generateRefreshToken(admin);

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                admin
            };

        } catch (error) {
            throw error;
        }
    }
}

export default AdminService; 