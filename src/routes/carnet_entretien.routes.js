const carnetRouter = require('express').Router();

const {
    getAllCarnet,
    getOneCarnetById,
    createOneCarnet,
    updateOneCarnet,
    deleteOneCarnet,
  } = require('../controllers/carnet_entretien.controller');
  
  carnetRouter.get('/', getAllCarnet);
  carnetRouter.get('/:id', getOneCarnetById);
  carnetRouter.post('/', createOneCarnet, getOneCarnetById);
  carnetRouter.put('/:id', updateOneCarnet, getOneCarnetById);
  carnetRouter.delete('/:id', deleteOneCarnet);
  
  module.exports = carnetRouter;
  