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

router.get('/', getUsers);           // GET /api/v1/users
router.get('/:id', getUserById);     // GET /api/v1/users/:id
router.post('/', createUser);        // POST /api/v1/users
router.put('/:id', updateUser);      // PUT /api/v1/users/:id
router.delete('/:id', deleteUser);   // DELETE /api/v1/users/:id

export default router;