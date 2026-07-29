import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// The base path here is already /api/v1/users based on your index.js setup
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of all registered users. Passwords are excluded.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john@example.com
 */
router.get('/', getUsers);           // GET /api/v1/users
router.get('/:id', getUserById);     // GET /api/v1/users/:id
router.post('/', createUser);        // POST /api/v1/users
router.put('/:id', updateUser);      // PUT /api/v1/users/:id
router.delete('/:id', deleteUser);   // DELETE /api/v1/users/:id

export default router;