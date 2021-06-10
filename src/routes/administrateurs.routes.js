const adminRouter = require('express').Router();
const {
  getAllAdministrateurs,
  getOneAdministrateurById,
  createOneAdministrateur,
  updateOneAdministrateur,
  deleteOneAdministrateur,
} = require('../controllers/administrateurs.controller');

adminRouter.get('/', getAllAdministrateurs);
adminRouter.get('/:id', getOneAdministrateurById);
adminRouter.post('/', createOneAdministrateur, getOneAdministrateurById);
adminRouter.put('/:id', updateOneAdministrateur, getOneAdministrateurById);
adminRouter.delete('/:id', deleteOneAdministrateur);

module.exports = adminRouter;
