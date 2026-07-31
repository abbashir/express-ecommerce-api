/**
 * Middleware for validating Product route parameters and request bodies.
 */

export const validateProductId = (req, res, next) => {
    const { id } = req.params;
    const numericId = Number(id);

    if (!id || isNaN(numericId) || !Number.isInteger(numericId) || numericId <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid product ID format. ID must be a positive integer.'
        });
    }

    next();
};

export const validateCreateProduct = (req, res, next) => {
    const { name, description, price, stock, sku } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim() === '') {
        errors.push('Field "name" is required and must be a non-empty string.');
    }

    if (price === undefined || price === null || isNaN(Number(price)) || Number(price) <= 0) {
        errors.push('Field "price" is required and must be a positive number greater than 0.');
    }

    if (!sku || typeof sku !== 'string' || sku.trim() === '') {
        errors.push('Field "sku" is required and must be a non-empty string.');
    }

    if (stock !== undefined && (isNaN(Number(stock)) || !Number.isInteger(Number(stock)) || Number(stock) < 0)) {
        errors.push('Field "stock" must be a non-negative integer.');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

export const validateUpdateProduct = (req, res, next) => {
    const { name, description, price, stock, sku } = req.body;
    const errors = [];

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'At least one field (name, description, price, stock, sku) must be provided for update.'
        });
    }

    if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
        errors.push('Field "name" must be a non-empty string.');
    }

    if (price !== undefined && (isNaN(Number(price)) || Number(price) <= 0)) {
        errors.push('Field "price" must be a positive number greater than 0.');
    }

    if (sku !== undefined && (typeof sku !== 'string' || sku.trim() === '')) {
        errors.push('Field "sku" must be a non-empty string.');
    }

    if (stock !== undefined && (isNaN(Number(stock)) || !Number.isInteger(Number(stock)) || Number(stock) < 0)) {
        errors.push('Field "stock" must be a non-negative integer.');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};
