const materielRouter = require('express').Router();
const {
  getAllMateriels,
  getOneMaterielById,
  createOneMateriel,
  updateOneMateriel,
  deleteOneMateriel,
  AllMaterielsByUserId,
} = require('../controllers/materielsControllers');

const { getOneModeleById } = require('../controllers/modelesControllers');
const { getOneMarqueById } = require('../controllers/marques.controller');

materielRouter.get('/', getAllMateriels);
materielRouter.get('/:id', getOneMaterielById, getOneModeleById, getOneMarqueById);
materielRouter.get('/users/:id', AllMaterielsByUserId);
materielRouter.post('/', createOneMateriel, getOneMaterielById);
materielRouter.put('/:id', updateOneMateriel, getOneMaterielById);
materielRouter.delete('/:id', deleteOneMateriel);

const modelesRoutes = require('./modeleRoutes');

materielRouter.use('/:id/modele', modelesRoutes);

const carnetRoutes = require('./carnet_entretien.routes');

materielRouter.use('/carnet_entretien', carnetRoutes);

module.exports = materielRouter;
