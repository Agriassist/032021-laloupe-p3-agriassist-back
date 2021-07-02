const materielRouter = require('express').Router();
const {
  getAllMateriels,
  getOneMaterielById,
  createOneMateriel,
  updateOneMateriel,
  deleteOneMateriel,
} = require('../controllers/materielsControllers');

const { getOneModeleById } = require('../controllers/modelesControllers');
const { getOneMarqueById } = require('../controllers/marques.controller');
const { getOneUserById } = require('../controllers/UsersControllers');

materielRouter.get('/', getAllMateriels);
materielRouter.get('/:id', getOneMaterielById, getOneModeleById, getOneMarqueById);
materielRouter.get('/:id', getOneUserById);
materielRouter.post('/', createOneMateriel, getOneMaterielById);
materielRouter.put('/:id', updateOneMateriel, getOneMaterielById);
materielRouter.delete('/:id', deleteOneMateriel);

const modelesRoutes = require('./modeleRoutes');

materielRouter.use('/:id/modele', modelesRoutes);

const carnetRoutes = require('./carnet_entretien.routes');

materielRouter.use('/carnet_entretien', carnetRoutes);

module.exports = materielRouter;
