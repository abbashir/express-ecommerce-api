import express from 'express';

const app = express();

// Built-in middleware to parse incoming JSON payloads (like request()->all() in Laravel)
app.use(express.json());

// Health check route
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'E-commerce API is up and running',
        timestamp: new Date().toISOString()
    });
});

// Basic 404 handler for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

export default app;