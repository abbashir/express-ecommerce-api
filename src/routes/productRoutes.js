import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import {
    validateProductId,
    validateCreateProduct,
    validateUpdateProduct
} from '../middlewares/productValidation.js';

const router = express.Router();

// GET /api/v1/products - List products (with pagination, search & sorting)
router.get('/', getProducts);

// GET /api/v1/products/:id - Fetch single product by ID
router.get('/:id', validateProductId, getProductById);

// POST /api/v1/products - Create a new product
router.post('/', validateCreateProduct, createProduct);

// PUT /api/v1/products/:id - Update product by ID
router.put('/:id', validateProductId, validateUpdateProduct, updateProduct);

// DELETE /api/v1/products/:id - Delete product by ID
router.delete('/:id', validateProductId, deleteProduct);

export default router;