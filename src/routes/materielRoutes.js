const materielRouter = require('express').Router();
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

const { getAllAgriculteurs } = require('../controllers/agriculteursControllers');
materielRouter.get('/:agriId/materiels', getAllAgriculteurs);

const modelesRoutes = require('./modeleRoutes');
materielRouter.use('/modele', modelesRoutes);

const carnetRoutes = require('./carnet_entretien.routes');
materielRouter.use('/carnet_entretien', carnetRoutes);

module.exports = materielRouter;
