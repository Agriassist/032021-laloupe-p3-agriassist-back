const userRouter = require('express').Router();

const { getAllUsers, getOneUserById, createOneUser, updateOneUser, deleteOneUser } = require('../controllers/UsersControllers');

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getOneUserById);
userRouter.post('/', createOneUser, getOneUserById);
userRouter.put('/:id', updateOneUser, getOneUserById);
userRouter.delete('/:id', deleteOneUser);

// const { getAllConcessionnaires } = require('../controllers/concessionnaires.controller');
// userRouter.get('/:agriId/concessionnaires', getAllConcessionnaires);

// const { getAllMateriels } = require('../controllers/materielsControllers');
// userRouter.get('/:agriId/materiels', getAllMateriels);

module.exports = userRouter;
