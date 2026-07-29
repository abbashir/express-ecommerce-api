import express from 'express';
import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';

const router = express.Router();

router.get('/health', (req, res) => res.json({ success: true, health: "Healthy APIs" }));

// Like Route::prefix('users')->group(...)
router.use('/users', userRoutes);
router.use('/products', productRoutes);

export default router;