const parkRouter = require('express').Router();
const materielRoutes = require('./materielRoutes');
const {
  getAllAMaterielByAgriculteurId,
  getOneMaterielByAgriculteurId,
  createOneMaterielByAgriculteurId,
  updateOneMaterielByAgriculteurById,
  deleteOneMaterielByAgriculteurId,
} = require('../controllers/park.controllers');

parkRouter.get('/', getAllAMaterielByAgriculteurId);
parkRouter.get('/:id', getOneMaterielByAgriculteurId);
parkRouter.post('/', createOneMaterielByAgriculteurId, getOneMaterielByAgriculteurId);
parkRouter.put('/:id', updateOneMaterielByAgriculteurById, getOneMaterielByAgriculteurId);
parkRouter.delete('/:id', deleteOneMaterielByAgriculteurId);

parkRouter.use('/:id/materiel', materielRoutes);

module.exports = parkRouter;
