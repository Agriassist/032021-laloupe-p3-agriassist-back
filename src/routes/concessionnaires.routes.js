const concRouter = require('express').Router();
const agriculteursRoutes = require('./agriRoutes');
const {
  getAllConcessionnaires,
  getOneConcessionnaireById,
  createOneConcessionnaire,
  updateOneConcessionnaire,
  deleteOneConcessionnaire,
} = require('../controllers/concessionnaires.controller');

concRouter.get('/', getAllConcessionnaires);
concRouter.get('/:id', getOneConcessionnaireById);
concRouter.post('/', createOneConcessionnaire, getOneConcessionnaireById);
concRouter.put('/:id', updateOneConcessionnaire, getOneConcessionnaireById);
concRouter.delete('/:id', deleteOneConcessionnaire);

concRouter.use('/:id/agriculteurs', agriculteursRoutes);

module.exports = concRouter;
