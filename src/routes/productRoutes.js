import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Using resource-like pattern (similar to Laravel's Route::apiResource('products', ProductController::class))
router.get('/', getProducts);         // GET /api/v1/products
router.get('/:id', getProductById);  // GET /api/v1/products/:id
router.post('/', createProduct);      // POST /api/v1/products
router.put('/:id', updateProduct);   // PUT /api/v1/products/:id
router.delete('/:id', deleteProduct);// DELETE /api/v1/products/:id

export default router;