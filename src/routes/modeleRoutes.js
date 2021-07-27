const modeleRouter = require('express').Router();
const {
  getAllModeles,
  getOneModeleById,
  createOneModele,
  updateOneModele,
  deleteOneModele,
  getAllModelesByMarqueId,
} = require('../controllers/modelesControllers');
const fichesRoutes = require('./fiche_technique.routes');
const marquesRoutes = require('./marqueRoutes');

modeleRouter.get('/', getAllModeles);
modeleRouter.get('/marque/:id', getAllModelesByMarqueId);
modeleRouter.get('/:id', getOneModeleById);
modeleRouter.post('/', createOneModele, getOneModeleById);
modeleRouter.put('/:id', updateOneModele, getOneModeleById);
modeleRouter.delete('/:id', deleteOneModele);

modeleRouter.use('/fiche_technique', fichesRoutes);
modeleRouter.use('/marque', marquesRoutes);

module.exports = modeleRouter;
