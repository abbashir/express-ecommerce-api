import express from 'express';

const router = express.Router();

// Like Route::get('/health', ...) in Laravel
router.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'API is healthy' });
});

export default router;