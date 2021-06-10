const aggriRouter = require('express').Router();
const { getAllAgriculteurs, createOneAgriculteur, getOneAgriculteurById, updateOneAgriculteur, deleteOneAgriculteur } = require('../controllers/agriController');

aggriRouter.get('/', getAllAgriculteurs);
aggriRouter.post('/:id', getOneAgriculteurById);
aggriRouter.post('/', createOneAgriculteur, getOneAgriculteurById);
aggriRouter.put('/:id', updateOneAgriculteur, getOneAgriculteurById);
aggriRouter.delete('/:id', deleteOneAgriculteur);

module.exports = aggriRouter;
