import prisma from '../config/db.js';

/**
 * GET /api/v1/products
 * Fetch all products with pagination, search, and sorting.
 */
export const getProducts = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
        const skip = (page - 1) * limit;

        const { search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

        // Build filtering condition
        const where = search ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ]
        } : {};

        // Valid sort fields
        const validSortFields = ['id', 'name', 'price', 'stock', 'createdAt', 'updatedAt'];
        const orderByField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
        const orderByDirection = sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';

        const [total, products] = await Promise.all([
            prisma.product.count({ where }),
            prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [orderByField]: orderByDirection }
            })
        ]);

        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                total,
                page,
                limit,
                totalPages
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/v1/products/:id
 * Fetch a single product by ID.
 */
export const getProductById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);

        const product = await prisma.product.findUnique({
            where: { id }
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

/**
 * POST /api/v1/products
 * Create a new product.
 */
export const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock = 0, sku } = req.body;

        const product = await prisma.product.create({
            data: {
                name: name.trim(),
                description: description ? description.trim() : null,
                price: Number(price),
                stock: parseInt(stock, 10),
                sku: sku.trim()
            }
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({
                success: false,
                message: 'A product with this SKU already exists.'
            });
        }
        next(error);
    }
};

/**
 * PUT /api/v1/products/:id
 * Update an existing product by ID.
 */
export const updateProduct = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name, description, price, stock, sku } = req.body;

        const dataToUpdate = {};
        if (name !== undefined) dataToUpdate.name = name.trim();
        if (description !== undefined) dataToUpdate.description = description ? description.trim() : null;
        if (price !== undefined) dataToUpdate.price = Number(price);
        if (stock !== undefined) dataToUpdate.stock = parseInt(stock, 10);
        if (sku !== undefined) dataToUpdate.sku = sku.trim();

        const product = await prisma.product.update({
            where: { id },
            data: dataToUpdate
        });

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        if (error.code === 'P2002') {
            return res.status(409).json({
                success: false,
                message: 'A product with this SKU already exists.'
            });
        }
        next(error);
    }
};

/**
 * DELETE /api/v1/products/:id
 * Delete a product by ID.
 */
export const deleteProduct = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);

        await prisma.product.delete({
            where: { id }
        });

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        next(error);
    }
};