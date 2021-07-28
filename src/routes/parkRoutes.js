const parkRouter = require('express').Router();
const materielRoutes = require('./materielRoutes');
const {
  getAllAMaterielByUserId,
  getOneMaterielByUserId,
  getUsersByMaterielId,
  createOneMaterielByUserId,
  updateOneMaterielByUserById,
  deleteOneParkByMaterielId,
} = require('../controllers/park.controllers');

parkRouter.get('/', getAllAMaterielByUserId);
parkRouter.get('/:id', getOneMaterielByUserId);
parkRouter.get('/materiel/:id', getUsersByMaterielId);
parkRouter.post('/', createOneMaterielByUserId, getOneMaterielByUserId);
parkRouter.put('/:id', updateOneMaterielByUserById, getOneMaterielByUserId);
parkRouter.delete('/:id', deleteOneParkByMaterielId);

parkRouter.use('/:id/materiel', materielRoutes);

module.exports = parkRouter;
