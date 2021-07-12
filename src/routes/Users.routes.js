const userRouter = require('express').Router();

const { getAllUsers, getOneUserById, createOneUser, updateOneUser, deleteOneUser, getManyMaterielById } = require('../controllers/UsersControllers');

const {
  authenticateAdminWithJsonWebToken,
  authenticateAgriWithJsonWebToken,
  authenticateConcWithJsonWebToken,
  clearCookie,
} = require('../services/jwt');

userRouter.get('/logout', clearCookie);
userRouter.get('/', authenticateAdminWithJsonWebToken, getAllUsers);
userRouter.get('/:id', authenticateAdminWithJsonWebToken, getOneUserById);
userRouter.get('/materiel/:id', authenticateAgriWithJsonWebToken, getManyMaterielById);
userRouter.post('/', createOneUser, getOneUserById);
userRouter.put('/:id', updateOneUser, getOneUserById);
userRouter.delete('/:id', deleteOneUser);

module.exports = userRouter;
