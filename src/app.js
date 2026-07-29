import express from 'express';
import apiRoutes from './routes/index.js';

const app = express();

// Built-in middleware to parse incoming JSON payloads (like request()->all() in Laravel)
app.use(express.json());

// Prefix all routes with /api/v1 (like Laravel's RouteServiceProvider)
app.use('/api/v1', apiRoutes);

// Basic 404 handler for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log for debugging (like Log::error)

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        // Only show stack trace in dev (like APP_DEBUG=true)
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

export default app;