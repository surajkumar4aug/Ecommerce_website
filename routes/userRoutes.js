import express from 'express';
import {
    authUser, 
    getUserProfile, 
    registerUser, 
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} from "../controlers/userControlers.js"
import {protect, admin} from "../middlwware/authMiddleware.js"

const router = express.Router();

router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)
router.route('/').post(registerUser)
router.post('/login', authUser)
router.delete('/:id', protect, admin, deleteUser)
router.get('/:id',protect, admin, getUserById)
router.put('/:id',protect, admin, updateUser)
router.get('/', protect, admin,  getUsers)

export default router;
