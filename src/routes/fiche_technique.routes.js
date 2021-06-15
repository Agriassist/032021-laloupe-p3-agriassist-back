const ficheRouter = require('express').Router();

const { getAllFiche, getOneFicheById, createOneFiche, updateOneFiche, deleteOneFiche } = require('../controllers/fiche_technique.controller');

ficheRouter.get('/', getAllFiche);
ficheRouter.get('/:id', getOneFicheById);
ficheRouter.post('/', createOneFiche, getOneFicheById);
ficheRouter.put('/:id', updateOneFiche, getOneFicheById);
ficheRouter.delete('/:id', deleteOneFiche);

module.exports = ficheRouter;
