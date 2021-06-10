const materielRouter = require('express').Router();
const modelesRoutes = require('./modeleRoutes');
const carnetRoutes = require('./carnet_entretien.routes')
const {
  getAllMateriels,
  getOneMaterielById,
  createOneMateriel,
  updateOneMateriel,
  deleteOneMateriel,
} = require('../controllers/materielsControllers');

materielRouter.get('/', getAllMateriels);
materielRouter.get('/:id', getOneMaterielById);
materielRouter.post('/', createOneMateriel, getOneMaterielById);
materielRouter.put('/:id', updateOneMateriel, getOneMaterielById);
materielRouter.delete('/:id', deleteOneMateriel);

materielRouter.use('/modele', modelesRoutes);
materielRouter.use('/carnet_entretien', carnetRoutes);

module.exports = materielRouter;
