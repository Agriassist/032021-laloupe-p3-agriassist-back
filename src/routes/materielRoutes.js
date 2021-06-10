const materielRouter = require('express').Router();
const modelesRoutes = require('./modeleRoutes');
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

module.exports = materielRouter;
