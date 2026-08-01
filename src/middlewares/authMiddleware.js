import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

export const protect = async (req, res, next) => {
    let token;

    // Check if the Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // Extract just the token
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
    }

    try {
        // Verify the token using your secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user in the database (excluding the password)
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, name: true, email: true, createdAt: true, updatedAt: true } // Add 'role' here later if you have admins
        });

        if (!user) {
            return res.status(401).json({ success: false, message: 'User belonging to this token no longer exists' });
        }

        // Attach the user to the request object (just like Auth::user() in Laravel)
        req.user = user;
        
        next(); // Proceed to the route handler
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};