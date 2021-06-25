const agriRouter = require('express').Router();

const {
  getAllAgriculteurs,
  getOneAgriculteurById,
  createOneAgriculteur,
  updateOneAgriculteur,
  deleteOneAgriculteur,
} = require('../controllers/agriculteursControllers');

agriRouter.get('/', getAllAgriculteurs);
agriRouter.get('/:id', getOneAgriculteurById);
agriRouter.post('/', createOneAgriculteur, getOneAgriculteurById);
agriRouter.put('/:id', updateOneAgriculteur, getOneAgriculteurById);
agriRouter.delete('/:id', deleteOneAgriculteur);

const { getAllConcessionnaires } = require('../controllers/concessionnaires.controller');

agriRouter.get('/:agriId/concessionnaires', getAllConcessionnaires);

const { getAllMateriels } = require('../controllers/materielsControllers');

agriRouter.get('/:agriId/materiels', getAllMateriels);

module.exports = agriRouter;
