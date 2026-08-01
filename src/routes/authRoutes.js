import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Example of a protected route using our middleware
router.get('/me', protect, (req, res) => {
    // Because of the 'protect' middleware, req.user is guaranteed to exist here
    res.status(200).json({ success: true, data: req.user });
});

export default router;