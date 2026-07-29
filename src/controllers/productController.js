import prisma from '../config/db.js';

// GET /api/v1/products (like Product::all())
export const getProducts = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error); // Passes the error to your global handler
    }
};

// GET /api/v1/products/:id (like Product::findOrFail($id))
export const getProductById = async (req, res, next) => {
    try {
        // Express params are strings, so we convert the ID to a number for Prisma
        const product = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) }
        });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// POST /api/v1/products (like Product::create($request->all()))
export const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, sku } = req.body;

        const product = await prisma.product.create({
            data: { name, description, price, stock, sku }
        });

        res.status(201).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// PUT /api/v1/products/:id (like $product->update($request->all()))
export const updateProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, sku } = req.body;

        const product = await prisma.product.update({
            where: { id: parseInt(req.params.id) },
            data: { name, description, price, stock, sku }
        });

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        // If Prisma can't find the record to update, it throws an error we can catch
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        next(error);
    }
};

// DELETE /api/v1/products/:id (like $product->delete())
export const deleteProduct = async (req, res, next) => {
    try {
        await prisma.product.delete({
            where: { id: parseInt(req.params.id) }
        });

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        next(error);
    }
};