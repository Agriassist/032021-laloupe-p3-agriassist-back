const modeleRouter = require('express').Router();
const { getAllModeles, getOneModeleById, createOneModele, updateOneModele, deleteOneModele } = require('../controllers/modelesControllers');

modeleRouter.get('/', getAllModeles);
modeleRouter.get('/:id', getOneModeleById);
modeleRouter.post('/', createOneModele, getOneModeleById);
modeleRouter.put('/:id', updateOneModele, getOneModeleById);
modeleRouter.delete('/:id', deleteOneModele);

module.exports = modeleRouter;
