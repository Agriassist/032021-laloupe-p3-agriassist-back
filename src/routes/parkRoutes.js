const parkRouter = require('express').Router();
const materielRoutes = require('./materielRoutes');
const {
  getAllAMaterielByUserId,
  getOneMaterielByUserId,
  createOneMaterielByUserId,
  updateOneMaterielByUserById,
  deleteOneMaterielByUserId,
} = require('../controllers/park.controllers');

parkRouter.get('/', getAllAMaterielByUserId);
parkRouter.get('/:id', getOneMaterielByUserId);
parkRouter.post('/', createOneMaterielByUserId, getOneMaterielByUserId);
parkRouter.put('/:id', updateOneMaterielByUserById, getOneMaterielByUserId);
parkRouter.delete('/:id', deleteOneMaterielByUserId);

parkRouter.use('/:id/materiel', materielRoutes);

module.exports = parkRouter;
