const userRouter = require('express').Router();

const { getAllUsers, getOneUserById, createOneUser, updateOneUser, deleteOneUser } = require('../controllers/UsersControllers');

const { authenticteAdminWithJsonWebToken } = require('../services/jwt');

userRouter.get('/', authenticteAdminWithJsonWebToken, getAllUsers);
userRouter.get('/:id', authenticteAdminWithJsonWebToken, getOneUserById);
userRouter.post('/', createOneUser, getOneUserById);
userRouter.put('/:id', updateOneUser, getOneUserById);
userRouter.delete('/:id', deleteOneUser);

module.exports = userRouter;
