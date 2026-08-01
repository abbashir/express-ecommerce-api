import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

export const protect = async (req, res, next) => {
    // 1. Validate x-client-key header against env CLIENT_KEY
    const clientKey = req.headers['x-client-key'];
    const validClientKey = process.env.CLIENT_KEY;

    if (validClientKey && clientKey !== validClientKey) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized: Invalid or missing x-client-key header'
        });
    }

    // 2. Extract x-api-token (or Authorization Bearer header as fallback)
    let token = req.headers['x-api-token'];

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized: Invalid or missing x-api-token header'
        });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user in the database
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User belonging to this token no longer exists'
            });
        }

        // Attach user to request object
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized: Token validation failed'
        });
    }
};