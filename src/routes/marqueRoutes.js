const marqueRouter = require('express').Router();
const { getAllMarques, getOneMarqueById, createOneMarque, updateOneMarque, deleteOneMarque } = require('../controllers/marques.controller');

marqueRouter.get('/', getAllMarques);
marqueRouter.get('/:id', getOneMarqueById);
marqueRouter.post('/', createOneMarque);
marqueRouter.put('/:id', updateOneMarque, getOneMarqueById);
marqueRouter.delete('/:id', deleteOneMarque);

module.exports = marqueRouter;
