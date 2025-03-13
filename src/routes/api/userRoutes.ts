import express from 'express';

const router = express.Router();
import{
    getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend
}from'../../controllers/UserController.js';

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/:userId/friend/:friendId').post(addFriend).delete(removeFriend);

export default router;