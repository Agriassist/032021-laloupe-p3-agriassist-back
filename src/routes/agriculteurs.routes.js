const agriRouter = require('express').Router();
const {
  getAllAgriculteurs,
  getOneAgriculteurById,
  createOneAgriculteur,
  updateOneAgriculteur,
  deleteOneAgriculteur,
} = require('../controllers/agriculteurs.controller');

agriRouter.get('/', getAllAgriculteurs);
agriRouter.get('/:id', getOneAgriculteurById);
agriRouter.post('/', createOneAgriculteur, getOneAgriculteurById);
agriRouter.put('/:id', updateOneAgriculteur, getOneAgriculteurById);
agriRouter.delete('/:id', deleteOneAgriculteur);

module.exports = agriRouter;
