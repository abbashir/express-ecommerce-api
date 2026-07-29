import prisma from '../config/db.js';
import bcrypt from 'bcrypt';

// GET /api/v1/users (like User::all())
export const getUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            // Select acts like $hidden in Laravel, preventing passwords from leaking
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};

// GET /api/v1/users/:id (like User::findOrFail($id))
export const getUserById = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id) },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

// POST /api/v1/users (like User::create())
export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password (like Hash::make($password) in Laravel)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
            select: { id: true, name: true, email: true } // Don't return the new password
        });

        res.status(201).json({ success: true, data: user });
    } catch (error) {
        // P2002 is Prisma's error code for a Unique constraint violation (e.g., email already exists)
        if (error.code === 'P2002') {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }
        next(error);
    }
};

// PUT /api/v1/users/:id (like $user->update())
export const updateUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let updateData = { name, email };

        // Only hash and update the password if the user actually provided a new one
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await prisma.user.update({
            where: { id: parseInt(req.params.id) },
            data: updateData,
            select: { id: true, name: true, email: true }
        });

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        if (error.code === 'P2002') {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }
        next(error);
    }
};

// DELETE /api/v1/users/:id (like $user->delete())
export const deleteUser = async (req, res, next) => {
    try {
        await prisma.user.delete({
            where: { id: parseInt(req.params.id) }
        });

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        next(error);
    }
};